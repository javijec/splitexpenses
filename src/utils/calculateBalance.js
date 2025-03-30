const calculateBalance = (expenses) => {
  const balances = {};

  // Recorremos cada expense activo
  expenses.forEach((expense) => {
    if (!expense.active) return;

    // Sumar lo pagado por cada persona
    expense.paidBy.forEach((payment) => {
      if (!balances[payment.id]) {
        balances[payment.id] = 0;
      }
      balances[payment.id] += payment.amount;
    });

    // Restar lo que le corresponde a cada persona según el split
    expense.splits.forEach((split) => {
      if (!balances[split.id]) {
        balances[split.id] = 0;
      }
      balances[split.id] -= split.amount;
    });
  });

  // Convertir el objeto balances a un array de objetos con id y amount
  const balancesArray = Object.entries(balances).map(([id, amount]) => ({
    id,
    amount,
  }));

  return balancesArray;
};

export default calculateBalance;
