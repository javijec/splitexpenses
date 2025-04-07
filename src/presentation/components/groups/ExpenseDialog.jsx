import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputAdornment,
  FormControl,
  IconButton,
  Alert,
  Stack,
  Divider,
  alpha,
  useTheme,
  Paper,
  Avatar,
  Chip,
  FormLabel,
  InputLabel,
  Grid,
  Tooltip,
} from "@mui/material";
import {
  Close as CloseIcon,
  Receipt as ReceiptIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Payments as PaymentsIcon,
  Person as PersonIcon,
  AttachMoney as MoneyIcon,
  PercentOutlined as PercentIcon,
  PeopleAlt as PeopleAltIcon,
  Save as SaveIcon,
} from "@mui/icons-material";

import { useAuth } from "@/application/contexts/AuthContext";
import { useModal } from "@/application/contexts/ModalContext";
import {
  createExpense,
  getGroupExpenses,
  updateExpense,
} from "@/domain/usecases/expenses";

export const ExpenseDialog = ({
  isOpen,
  onClose,
  membersList,
  onExpenseAdded,
}) => {
  const theme = useTheme();
  const { user, groupContext } = useAuth();
  const { modalData } = useModal();
  const [description, setDescription] = useState("");
  const [paidByAmounts, setPaidByAmounts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [divisionType, setDivisionType] = useState("equal"); // equal, amount, percentage
  const [splitAmounts, setSplitAmounts] = useState([]);
  const [remaining, setRemaining] = useState(0);
  const [remainingPercentage, setRemainingPercentage] = useState(100);
  const [members, setMembers] = useState([]);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  useEffect(() => {
    setMembers(membersList);
  }, [membersList]);

  useEffect(() => {
    if (isOpen) {
      if (modalData) {
        // Edit mode - populate with existing expense data
        setDescription(modalData.description || "");
        setTotalAmount(modalData.totalAmount || 0);
        setPaidByAmounts(modalData.paidBy || []);
        setDivisionType(modalData.splitType || "equal");
        setSplitAmounts(modalData.splits || []);
      } else {
        // Create mode - initialize with defaults
        setDescription("");
        setTotalAmount(0);

        // Initialize paidByAmounts with current user
        const initialPaidBy = [];
        if (user) {
          initialPaidBy.push({
            id: user.uid,
            amount: 0,
            displayName: user.displayName || user.email || "",
          });
        }
        setPaidByAmounts(initialPaidBy);

        // Initialize with equal division
        setDivisionType("equal");

        // Inicializar splitAmounts con división igual
        if (groupContext?.members?.length > 0) {
          const equalSplit = 0; // Inicialmente 0 porque totalAmount es 0
          const equalSplits = groupContext.members.map((member) => ({
            id: member.id,
            amount: equalSplit,
            displayName: member.displayName || member.email || "",
          }));
          setSplitAmounts(equalSplits);
        } else {
          setSplitAmounts([]);
        }
      }
    }
  }, [isOpen, user]);

  // Calculate remaining amount or percentage when values change
  useEffect(() => {
    if (divisionType === "amount") {
      const totalSplit = splitAmounts.reduce(
        (sum, item) => sum + Number(item.amount || 0),
        0
      );
      setRemaining(totalAmount - totalSplit);
    } else if (divisionType === "percentage") {
      const totalPercentage = splitAmounts.reduce(
        (sum, item) => sum + Number(item.amount || 0),
        0
      );
      setRemainingPercentage(100 - totalPercentage);
    }
  }, [splitAmounts, totalAmount, divisionType]);

  // Update total amount when paid by amounts change
  useEffect(() => {
    const total = paidByAmounts.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );
    setTotalAmount(total);

    if (divisionType === "equal" && members.length > 0) {
      const equalSplit = total / members.length;
      const equalSplits = members.map((member) => ({
        id: member.id,
        amount: equalSplit,
        displayName: member.displayName || member.email || "",
      }));
      setSplitAmounts(equalSplits);
    }
  }, [paidByAmounts, divisionType, members]);

  const handlePaidByChange = (memberId, value) => {
    setPaidByAmounts((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === memberId);
      // Find the member to get the displayName
      const member = members.find((m) => m.id === memberId);
      const displayName = member?.displayName || member?.email || "";

      if (existingIndex >= 0) {
        // Update existing item
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          amount: Number(value) || 0,
          displayName: displayName,
        };
        return updated;
      } else {
        // Add new item
        return [
          ...prev,
          {
            id: memberId,
            amount: Number(value) || 0,
            displayName: displayName,
          },
        ];
      }
    });
  };

  const handleSplitAmountChange = (member, value) => {
    setSplitAmounts((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === member.id);
      if (existingIndex >= 0) {
        // Update existing item
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          amount: Number(value) || 0,
        };
        return updated;
      } else {
        // Add new item
        return [
          ...prev,
          {
            id: member.id,
            displayName: member.displayName,
            amount: Number(value) || 0,
          },
        ];
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset errors
    setErrors({});
    setFormError("");

    // Validate inputs
    let isValid = true;
    const newErrors = {};

    // Validate description (required)
    if (!description.trim()) {
      newErrors.description = "La descripción es obligatoria";
      isValid = false;
    }

    // Validate total amount (must be greater than 0)
    if (totalAmount <= 0) {
      newErrors.totalAmount = "El monto total debe ser mayor que 0";
      isValid = false;
    }

    // Validate remaining amount or percentage (must be 0) for non-equal divisions
    if (divisionType === "amount" && Math.abs(remaining) > 0.01) {
      setFormError("El monto restante debe ser 0");
      isValid = false;
    } else if (
      divisionType === "percentage" &&
      Math.abs(remainingPercentage) > 0.01
    ) {
      setFormError("El porcentaje restante debe ser 0");
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      return; // Stop submission if validation fails
    }

    // Prepare expense data
    const expenseData = {
      description,
      amount: totalAmount,
      groupId: groupContext?.id,
      paidBy: paidByAmounts,
      splitType: divisionType,
      splits: splitAmounts,
      active: true,
    };
    if (modalData) {
      await updateExpense(modalData.id, expenseData);
    } else {
      await createExpense(expenseData);
    }

    // Call the callback to update expenses list
    if (onExpenseAdded) {
      const updatedExpenses = await getGroupExpenses(groupContext?.id); // Fetch updated expenses
      onExpenseAdded(updatedExpenses);
    }

    // Close modal
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          maxWidth: 600,
        },
      }}
    >
      <DialogTitle
        sx={{
          p: 3,
          pb: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            sx={{
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              width: 48,
              height: 48,
            }}
          >
            {modalData ? <EditIcon /> : <AddIcon />}
          </Avatar>
          <Box>
            <Typography variant="h5" fontWeight="bold" color="text.primary">
              {modalData ? "Editar Gasto" : "Añadir Gasto"}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {modalData
                ? "Modifica los detalles del gasto existente"
                : "Registra un nuevo gasto para dividir entre los miembros"}
            </Typography>
          </Box>
        </Stack>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ color: "text.secondary" }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <Divider sx={{ mx: 3 }} />

      <DialogContent sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {formError && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: 2,
              }}
            >
              {formError}
            </Alert>
          )}

          {/* Descripción del gasto */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.03),
              border: "1px solid",
              borderColor: alpha(theme.palette.primary.main, 0.1),
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Detalles del gasto
            </Typography>

            <TextField
              fullWidth
              id="description"
              label="Descripción *"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej: Cena, Supermercado, Entradas al cine..."
              required
              error={!!errors.description}
              helperText={errors.description}
              variant="outlined"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ReceiptIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{
                mt: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Paper>

          {/* Sección de pagado por */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.03),
              border: "1px solid",
              borderColor: alpha(theme.palette.primary.main, 0.1),
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Avatar
                sx={{
                  bgcolor: alpha(theme.palette.success.main, 0.1),
                  color: theme.palette.success.main,
                  width: 32,
                  height: 32,
                }}
              >
                <PaymentsIcon fontSize="small" />
              </Avatar>
              <Typography variant="subtitle1" fontWeight="bold">
                ¿Quién pagó?
              </Typography>
            </Stack>

            <Grid container spacing={2}>
              {members?.map((member) => (
                <Grid item xs={12} sm={6} key={member.id}>
                  <TextField
                    fullWidth
                    label={member.displayName || member.email}
                    type="number"
                    value={
                      paidByAmounts.find((item) => item.id === member.id)
                        ?.amount || ""
                    }
                    onChange={(e) =>
                      handlePaidByChange(member.id, e.target.value)
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">$</InputAdornment>
                      ),
                    }}
                    variant="outlined"
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
              ))}
            </Grid>

            {/* Total amount - calculated from paid by amounts */}
            <Box
              sx={{
                mt: 3,
                p: 2,
                bgcolor: alpha(theme.palette.success.main, 0.1),
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="subtitle1" fontWeight="medium">
                Monto Total:
              </Typography>
              <Chip
                label={`$${totalAmount.toFixed(2)}`}
                color="success"
                variant={totalAmount > 0 ? "filled" : "outlined"}
                icon={<MoneyIcon />}
                sx={{
                  fontWeight: "bold",
                  px: 1,
                }}
              />
            </Box>
            {errors.totalAmount && (
              <Typography
                color="error"
                variant="caption"
                sx={{ mt: 1, display: "block" }}
              >
                {errors.totalAmount}
              </Typography>
            )}
          </Paper>

          {/* Sección de división del gasto */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.03),
              border: "1px solid",
              borderColor: alpha(theme.palette.primary.main, 0.1),
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Avatar
                sx={{
                  bgcolor: alpha(theme.palette.info.main, 0.1),
                  color: theme.palette.info.main,
                  width: 32,
                  height: 32,
                }}
              >
                <PeopleAltIcon fontSize="small" />
              </Avatar>
              <Typography variant="subtitle1" fontWeight="bold">
                ¿Cómo dividir el gasto?
              </Typography>
            </Stack>

            {/* Division type selector */}
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="division-type-select-label">
                Tipo de división
              </InputLabel>
              <Select
                value={divisionType}
                onChange={(e) => {
                  const newDivisionType = e.target.value;
                  setDivisionType(newDivisionType);

                  // Si el tipo de división es 'equal', calcular inmediatamente la división igual
                  if (newDivisionType === "equal") {
                    // Calcular división igual entre los miembros
                    const equalSplit = totalAmount / members.length;
                    const equalSplits = members.map((member) => ({
                      id: member.id,
                      displayName: member.displayName || member.email || "",
                      amount: equalSplit,
                    }));
                    setSplitAmounts(equalSplits);
                  } else if (
                    splitAmounts.length === 0 ||
                    divisionType === "equal"
                  ) {
                    // Si cambiamos de 'equal' a otro tipo, inicializar con valores vacíos
                    setSplitAmounts([]);
                  }
                }}
                labelId="division-type-select-label"
                label="Tipo de división"
                sx={{
                  borderRadius: 2,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: 2,
                  },
                }}
              >
                <MenuItem value="equal">Partes Iguales</MenuItem>
                <MenuItem value="amount">Por Montos</MenuItem>
                <MenuItem value="percentage">Por Porcentajes</MenuItem>
              </Select>
            </FormControl>

            {divisionType === "equal" ? (
              <Box
                sx={{
                  p: 2,
                  bgcolor: alpha(theme.palette.info.main, 0.1),
                  borderRadius: 2,
                  textAlign: "center",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  El gasto se dividirá en partes iguales entre todos los
                  miembros
                </Typography>
                {members.length > 0 && totalAmount > 0 && (
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    sx={{ mt: 1 }}
                  >
                    Cada persona pagará: $
                    {(totalAmount / members.length).toFixed(2)}
                  </Typography>
                )}
              </Box>
            ) : (
              <>
                <Box
                  sx={{
                    p: 2,
                    mb: 2,
                    bgcolor: alpha(
                      divisionType === "amount"
                        ? theme.palette.warning.main
                        : theme.palette.secondary.main,
                      0.1
                    ),
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="subtitle2" fontWeight="medium">
                    Restante:
                  </Typography>
                  <Chip
                    label={
                      divisionType === "amount"
                        ? `$${remaining.toFixed(2)}`
                        : `${remainingPercentage.toFixed(2)}%`
                    }
                    color={
                      Math.abs(
                        divisionType === "amount"
                          ? remaining
                          : remainingPercentage
                      ) < 0.01
                        ? "success"
                        : "warning"
                    }
                    variant="outlined"
                    icon={
                      divisionType === "amount" ? (
                        <MoneyIcon />
                      ) : (
                        <PercentIcon />
                      )
                    }
                    sx={{
                      fontWeight: "bold",
                    }}
                  />
                </Box>

                {/* Member split inputs */}
                <Grid container spacing={2}>
                  {members.map((member) => (
                    <Grid item xs={12} sm={6} key={member.id}>
                      <TextField
                        fullWidth
                        label={member.displayName || member.email}
                        type="number"
                        value={
                          splitAmounts.find((item) => item.id === member.id)
                            ?.amount || ""
                        }
                        onChange={(e) => {
                          // Only allow positive numbers
                          const value = e.target.value;
                          if (/^\d*\.?\d*$/.test(value) && value >= 0) {
                            handleSplitAmountChange(member, value);
                          }
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon color="action" />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              {divisionType === "amount" ? "$" : "%"}
                            </InputAdornment>
                          ),
                          inputProps: {
                            min: 0,
                            step: "0.01",
                          },
                        }}
                        variant="outlined"
                        size="small"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </Paper>

          {/* Action buttons */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button
              onClick={onClose}
              variant="outlined"
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={modalData ? <SaveIcon /> : <AddIcon />}
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1,
                textTransform: "none",
                fontWeight: 600,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              {modalData ? "Guardar Cambios" : "Añadir Gasto"}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
