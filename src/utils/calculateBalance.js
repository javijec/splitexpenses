const calculateBalance = (expenses) => {
  const balances = {};
  const displayNames = {};

  // Recorremos cada expense activo
  expenses.forEach((expense) => {
    if (!expense.active) return;

    // Sumar lo pagado por cada persona
    expense.paidBy.forEach((payment) => {
      if (!balances[payment.id]) {
        balances[payment.id] = 0;
        displayNames[payment.id] = payment.displayName;
      }
      balances[payment.id] += payment.amount;
    });

    // Restar lo que le corresponde a cada persona según el split
    expense.splits.forEach((split) => {
      if (!balances[split.id]) {
        balances[split.id] = 0;
        displayNames[split.id] = split.displayName;
      }

      // Si el splitType es percentage, convertir el porcentaje a monto absoluto
      if (expense.splitType === "percentage") {
        // split.amount es un porcentaje, convertirlo a monto absoluto
        const amountToSubtract = (split.amount / 100) * expense.amount;
        balances[split.id] -= amountToSubtract;
      } else {
        // Para splitType 'equal' o 'amount', usar el valor directamente
        balances[split.id] -= split.amount;
      }
    });
  });

  // Convertir el objeto balances a un array de objetos con id, amount y displayName
  const balancesArray = Object.entries(balances).map(([id, amount]) => ({
    id,
    amount,
    displayName: displayNames[id],
  }));

  // Devolver el array de balances ordenad
  return balancesArray;
};

export default calculateBalance;
