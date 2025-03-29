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
} from "@mui/material";
import {
  Close as CloseIcon,
  Receipt as ReceiptIcon,
} from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import { useAuth } from "@/application/contexts/AuthContext";

const ExpenseModal = ({ isOpen, onClose, expense = null }) => {
  const { user, groupContext } = useAuth();
  const [description, setDescription] = useState("");
  const [paidByAmounts, setPaidByAmounts] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [divisionType, setDivisionType] = useState("equal"); // equal, amount, percentage
  const [splitAmounts, setSplitAmounts] = useState({});
  const [remaining, setRemaining] = useState(0);
  const [remainingPercentage, setRemainingPercentage] = useState(100);
  const [members, setMembers] = useState(groupContext?.members || []);
  // Initialize state when modal opens
  useEffect(() => {
    if (isOpen) {
      if (expense) {
        // Edit mode - populate with existing expense data
        setDescription(expense.description || "");
        setTotalAmount(expense.totalAmount || 0);
        setPaidByAmounts(expense.paidByAmounts || {});
        setDivisionType(expense.divisionType || "equal");
        setSplitAmounts(expense.splitAmounts || {});
      } else {
        // Create mode - initialize with defaults
        setDescription("");
        setTotalAmount(0);

        // Initialize paidByAmounts with current user
        const initialPaidBy = {};
        if (user) {
          initialPaidBy[user.uid] = 0;
        }
        setPaidByAmounts(initialPaidBy);

        // Initialize with equal division
        setDivisionType("equal");
        setSplitAmounts({});
      }
    }
  }, [isOpen, expense, user]);

  // Calculate remaining amount or percentage when values change
  useEffect(() => {
    if (divisionType === "amount") {
      const totalSplit = Object.values(splitAmounts).reduce(
        (sum, amount) => sum + Number(amount || 0),
        0
      );
      setRemaining(totalAmount - totalSplit);
    } else if (divisionType === "percentage") {
      const totalPercentage = Object.values(splitAmounts).reduce(
        (sum, percentage) => sum + Number(percentage || 0),
        0
      );
      setRemainingPercentage(100 - totalPercentage);
    }
  }, [splitAmounts, totalAmount, divisionType]);

  // Update total amount when paid by amounts change
  useEffect(() => {
    const total = Object.values(paidByAmounts).reduce(
      (sum, amount) => sum + Number(amount || 0),
      0
    );
    setTotalAmount(total);
  }, [paidByAmounts]);

  const handlePaidByChange = (memberId, value) => {
    setPaidByAmounts((prev) => ({
      ...prev,
      [memberId]: Number(value) || 0,
    }));
  };

  const handleSplitAmountChange = (memberId, value) => {
    setSplitAmounts((prev) => ({
      ...prev,
      [memberId]: Number(value) || 0,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare expense data
    const expenseData = {
      description,
      totalAmount,
      paidByAmounts,
      divisionType,
      splitAmounts,
      createdBy: user.uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    // Validate inputs
    // Save expense to Firestore
    // Save balance updates to Firestore
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
          {/* Description field */}
          <TextField
            margin="normal"
            fullWidth
            id="description"
            label="Descripción"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            autoFocus
            variant="outlined"
            placeholder="Ej: Cena, Supermercado, Entradas al cine..."
            InputProps={{
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
            {members.map((member) => (
              <Box key={member.id}>
                <TextField
                  margin="dense"
                  fullWidth
                  label={member.displayName || member.email}
                  type="number"
                  value={paidByAmounts[member.id] || ""}
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
            Monto Total
          </Typography>
          <Box
            sx={{
              p: 2,
              bgcolor: (theme) => alpha(theme.palette.success.main, 0.1),
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
              transition: "all 0.3s ease",
              border: "1px solid",
              borderColor: (theme) => alpha(theme.palette.success.main, 0.2),
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
                color: "success.main",
                textAlign: "center",
              }}
            >
              ${totalAmount.toFixed(2)}
            </Typography>
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
                  onChange={(e) => setDivisionType(e.target.value)}
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
                color="text.secondary"
                sx={{
                  mb: 1,
                  p: 1,
                  bgcolor: "rgba(0, 0, 0, 0.03)",
                  borderRadius: 1,
                  display: "inline-block",
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
                      value={splitAmounts[member.displayName] || ""}
                      onChange={(e) =>
                        handleSplitAmountChange(member.id, e.target.value)
                      }
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {divisionType === "amount" ? "$" : "%"}
                          </InputAdornment>
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
