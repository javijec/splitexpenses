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
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

import { useAuth } from "@/application/contexts/AuthContext";
import { useModal } from "@/application/contexts/ModalContext";
import {
  createExpense,
  getGroupExpenses,
  updateExpense,
} from "@/domain/usecases/expenses";

const ExpenseModal = ({ isOpen, onClose, membersList, onExpenseAdded }) => {
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
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        <Box>
          <Box>
            {modalData ? (
              <Typography>Editar Gasto</Typography>
            ) : (
              <Typography>Añadir Gasto</Typography>
            )}
          </Box>
        </Box>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit}>
          {formError && <Alert severity="error">{formError}</Alert>}
          <TextField
            id="description"
            label="Descripción *"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ej: Cena, Supermercado, Entradas al cine..."
            required
            error={!!errors.description}
            helperText={errors.description}
          />

          {/* Paid by section */}
          <Typography>Pagado por</Typography>
          <Box>
            {members?.map((member) => (
              <Box key={member.id}>
                <TextField
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
                    endAdornment: (
                      <InputAdornment position="end">$</InputAdornment>
                    ),
                  }}
                />
              </Box>
            ))}
          </Box>

          {/* Total amount - calculated from paid by amounts */}
          <Box>
            <Typography>Monto Total</Typography>
            <Typography>${totalAmount.toFixed(2)}</Typography>
            {errors.totalAmount && (
              <Typography>{errors.totalAmount}</Typography>
            )}
          </Box>

          {/* Division type selector */}
          <Box>
            <Box>
              <FormControl>
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
              <Box>
                <Typography>División del Gasto</Typography>
                {/* Show remaining amount or percentage */}
                <Typography>
                  Restante:{" "}
                  {divisionType === "amount"
                    ? `$${remaining.toFixed(2)}`
                    : `${remainingPercentage.toFixed(2)}%`}
                </Typography>
              </Box>
              {/* Member split inputs */}
              <Box>
                {members.map((member) => (
                  <Box key={member.id}>
                    <TextField
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
                        endAdornment: (
                          <InputAdornment>
                            {divisionType === "amount" ? "$" : "%"}
                          </InputAdornment>
                        ),
                        inputProps: {
                          min: 0,
                          step: "0.01",
                        },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </>
          )}

          {/* Action buttons */}
          <Box>
            <Button>CANCELAR</Button>
            {modalData ? (
              <Button type="submit">GUARDAR GASTO</Button>
            ) : (
              <Button type="submit">AÑADIR GASTO</Button>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseModal;
