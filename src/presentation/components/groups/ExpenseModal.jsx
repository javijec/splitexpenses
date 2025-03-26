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
  InputLabel,
} from "@mui/material";
import { useAuth } from "@/application/contexts/AuthContext";

const ExpenseModal = ({
  isOpen,
  onClose,
  groupMembers = [],
  expense = null,
}) => {
  const { user } = useAuth();
  const [description, setDescription] = useState("");
  const [paidByAmounts, setPaidByAmounts] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [divisionType, setDivisionType] = useState("equal"); // equal, amount, percentage
  const [splitAmounts, setSplitAmounts] = useState({});
  const [remaining, setRemaining] = useState(0);
  const [remainingPercentage, setRemainingPercentage] = useState(100);

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
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography>Añadir Gasto</Typography>
      </DialogTitle>
      <DialogContent>
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
          />

          {/* Paid by section */}
          <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
            Pagado por
          </Typography>
          {user && (
            <TextField
              margin="normal"
              fullWidth
              label={user.displayName || user.email}
              type="number"
              value={paidByAmounts[user.uid] || ""}
              onChange={(e) => handlePaidByChange(user.uid, e.target.value)}
              InputProps={{
                endAdornment: <InputAdornment position="end">€</InputAdornment>,
              }}
            />
          )}

          {/* Total amount - calculated from paid by amounts */}
          <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
            Monto Total
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            label="Monto Total"
            type="number"
            value={totalAmount}
            InputProps={{
              readOnly: true,
            }}
          />

          {/* Division type selector */}
          <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
            Tipo de División
          </Typography>
          <FormControl fullWidth margin="normal">
            <Select
              value={divisionType}
              onChange={(e) => setDivisionType(e.target.value)}
              displayEmpty
            >
              <MenuItem value="equal">Partes Iguales</MenuItem>
              <MenuItem value="amount">Por Montos</MenuItem>
              <MenuItem value="percentage">Por Porcentajes</MenuItem>
            </Select>
          </FormControl>

          {/* Division of expense section - changes based on division type */}
          {divisionType !== "equal" && (
            <>
              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                División del Gasto
              </Typography>

              {/* Show remaining amount or percentage */}
              <Typography variant="body2" color="text.secondary">
                Restante:{" "}
                {divisionType === "amount"
                  ? `€${remaining.toFixed(2)}`
                  : `${remainingPercentage.toFixed(2)}%`}
              </Typography>

              {/* Member split inputs */}
              {groupMembers.map((member) => (
                <TextField
                  key={member.id}
                  margin="normal"
                  fullWidth
                  label={member.name || member.email}
                  type="number"
                  value={splitAmounts[member.id] || ""}
                  onChange={(e) =>
                    handleSplitAmountChange(member.id, e.target.value)
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {divisionType === "amount" ? "€" : "%"}
                      </InputAdornment>
                    ),
                  }}
                />
              ))}
            </>
          )}

          {/* Action buttons */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button onClick={onClose} color="inherit">
              CANCELAR
            </Button>
            <Button type="submit" variant="contained" color="primary">
              AÑADIR GASTO
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseModal;
