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
  Fade,
  Avatar,
  Alert,
} from "@mui/material";
import {
  Close as CloseIcon,
  Receipt as ReceiptIcon,
} from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import { useAuth } from "@/application/contexts/AuthContext";
import { createExpense } from "@/domain/usecases/expenses";

const ExpenseModal = ({ isOpen, onClose, expense = [], membersList }) => {
  const { user, groupContext } = useAuth();
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
      if (expense) {
        // Edit mode - populate with existing expense data
        setDescription(expense.description || "");
        setTotalAmount(expense.totalAmount || 0);
        setPaidByAmounts(expense.paidByAmounts || []);
        setDivisionType(expense.divisionType || "equal");
        setSplitAmounts(expense.splitAmounts || []);
      } else {
        // Create mode - initialize with defaults
        setDescription("");
        setTotalAmount(0);

        // Initialize paidByAmounts with current user
        const initialPaidBy = [];
        if (user) {
          initialPaidBy.push({ id: user.uid, amount: 0 });
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
      }));
      setSplitAmounts(equalSplits);
    }
  }, [paidByAmounts, divisionType, members]);

  const handlePaidByChange = (memberId, value) => {
    setPaidByAmounts((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === memberId);
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
        return [...prev, { id: memberId, amount: Number(value) || 0 }];
      }
    });
  };

  const handleSplitAmountChange = (memberId, value) => {
    setSplitAmounts((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === memberId);
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
        return [...prev, { id: memberId, amount: Number(value) || 0 }];
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

    // Save expense to Firestore
    await createExpense(expenseData);
    // Close modal
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "4px",
            background: (theme) => `${theme.palette.success.main}`,
          },
          transition: "all 0.3s ease",
        },
      }}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 400 }}
    >
      <DialogTitle
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
          pb: 2,
          pt: 3,
          px: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{
              bgcolor: (theme) => alpha(theme.palette.success.main, 0.1),
              color: "success.main",
              width: 40,
              height: 40,
              mr: 1.5,
            }}
          >
            <ReceiptIcon />
          </Avatar>
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, letterSpacing: 0.2 }}
            >
              Añadir Gasto
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Registra un nuevo gasto para dividir entre los miembros del grupo
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: "error.main",
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
            border: "1px solid",
            borderColor: (theme) => alpha(theme.palette.error.main, 0.2),
            "&:hover": {
              bgcolor: (theme) => alpha(theme.palette.error.main, 0.2),
              transform: "scale(1.05)",
            },
            transition: "all 0.2s ease",
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 3, pt: 3, bgcolor: "background.paper" }}>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          {formError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {formError}
            </Alert>
          )}
          {/* Description field */}
          <TextField
            margin="normal"
            fullWidth
            id="description"
            label="Descripción *"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            autoFocus
            variant="outlined"
            placeholder="Ej: Cena, Supermercado, Entradas al cine..."
            required
            error={!!errors.description}
            helperText={errors.description}
            slotProps={{
              sx: {
                borderRadius: 2,
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: (theme) =>
                    alpha(theme.palette.success.main, 0.5),
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "success.main",
                },
              },
            }}
          />

          {/* Paid by section */}
          <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
            Pagado por
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              mt: 1,
              mb: 2,
              pb: 1,
            }}
          >
            {members?.map((member) => (
              <Box key={member.id}>
                <TextField
                  margin="dense"
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
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">$</InputAdornment>
                    ),
                    sx: {
                      borderRadius: 2,
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: (theme) =>
                          alpha(theme.palette.success.main, 0.5),
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "success.main",
                      },
                    },
                  }}
                />
              </Box>
            ))}
          </Box>

          {/* Total amount - calculated from paid by amounts */}
          <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
            Monto Total *
          </Typography>
          <Box
            sx={{
              p: 2,
              bgcolor: (theme) => alpha(theme.palette.success.main, 0.1),
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
              transition: "all 0.3s ease",
              border: "1px solid",
              borderColor: (theme) =>
                errors.totalAmount
                  ? alpha(theme.palette.error.main, 0.5)
                  : alpha(theme.palette.success.main, 0.2),
              "&:hover": {
                boxShadow: "0 6px 16px rgba(0, 0, 0, 0.12)",
                transform: "translateY(-2px)",
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: errors.totalAmount ? "error.main" : "success.main",
                textAlign: "center",
              }}
            >
              ${totalAmount.toFixed(2)}
            </Typography>
            {errors.totalAmount && (
              <Typography
                variant="caption"
                color="error"
                sx={{ display: "block", textAlign: "center", mt: 1 }}
              >
                {errors.totalAmount}
              </Typography>
            )}
          </Box>

          {/* Division type selector */}
          <Typography
            variant="subtitle2"
            sx={{ mt: 2, mb: 1, fontWeight: 500 }}
          >
            Tipo de División
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              gap: 2,
              mt: 1,
              mb: 2,
              overflowX: "auto",
              pb: 1,
            }}
          >
            <Box
              sx={{
                flex: {
                  xs: "1 1 100%",
                  sm: "1 1 calc(50% - 16px)",
                  md: "1 1 calc(33.33% - 16px)",
                },
              }}
            >
              <FormControl fullWidth margin="dense">
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
                  displayEmpty
                  sx={{
                    borderRadius: 2,
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: (theme) =>
                        alpha(theme.palette.success.main, 0.5),
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "success.main",
                    },
                  }}
                >
                  <MenuItem value="equal">Partes Iguales</MenuItem>
                  <MenuItem value="amount">Por Montos</MenuItem>
                  <MenuItem value="percentage">Por Porcentajes</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Division of expense section - changes based on division type */}
          {divisionType !== "equal" && (
            <>
              <Typography
                variant="subtitle2"
                sx={{ mt: 2, mb: 1, fontWeight: 500 }}
              >
                División del Gasto
              </Typography>
              {/* Show remaining amount or percentage */}
              <Typography
                variant="body2"
                color={formError ? "error" : "text.secondary"}
                sx={{
                  mb: 1,
                  p: 1,
                  bgcolor: formError
                    ? alpha("#f44336", 0.1)
                    : "rgba(0, 0, 0, 0.03)",
                  borderRadius: 1,
                  display: "inline-block",
                  border: formError ? "1px solid" : "none",
                  borderColor: formError
                    ? alpha("#f44336", 0.5)
                    : "transparent",
                }}
              >
                Restante:{" "}
                {divisionType === "amount"
                  ? `$${remaining.toFixed(2)}`
                  : `${remainingPercentage.toFixed(2)}%`}
              </Typography>
              {/* Member split inputs */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  gap: 2,
                  mt: 1,
                  mb: 2,
                  overflowX: "auto",
                  pb: 1,
                }}
              >
                {members.map((member) => (
                  <Box
                    key={member.id}
                    sx={{
                      flex: {
                        xs: "1 1 100%",
                        sm: "1 1 calc(50% - 16px)",
                        md: "1 1 calc(33.33% - 16px)",
                      },
                    }}
                  >
                    <TextField
                      margin="dense"
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
                          handleSplitAmountChange(member.id, value);
                        }
                      }}
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {divisionType === "amount" ? "$" : "%"}
                          </InputAdornment>
                        ),
                        inputProps: {
                          min: 0,
                          step: "0.01",
                        },
                        sx: {
                          borderRadius: 2,
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: (theme) =>
                              alpha(theme.palette.success.main, 0.5),
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "success.main",
                          },
                        },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </>
          )}

          {/* Action buttons */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button
              onClick={onClose}
              color="inherit"
              sx={{
                borderRadius: 2,
                fontWeight: 500,
                border: "1px solid",
                borderColor: (theme) => alpha(theme.palette.grey[500], 0.2),
                "&:hover": {
                  bgcolor: (theme) => alpha(theme.palette.grey[500], 0.05),
                },
                transition: "all 0.2s ease",
              }}
            >
              CANCELAR
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                py: 1.5,
                px: 3,
                borderRadius: 2,
                fontWeight: 600,
                bgcolor: "success.main",
                boxShadow: (theme) =>
                  `0 4px 12px ${alpha(theme.palette.success.main, 0.3)}`,
                "&:hover": {
                  bgcolor: "success.dark",
                  boxShadow: (theme) =>
                    `0 6px 16px ${alpha(theme.palette.success.main, 0.4)}`,
                  transform: "translateY(-2px)",
                },
                transition: "all 0.2s ease",
              }}
              disableElevation
            >
              AÑADIR GASTO
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseModal;
