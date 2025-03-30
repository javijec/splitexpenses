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

console.log("Balances netos:");
for (const [id, balance] of Object.entries(balances)) {
  console.log(`${id}: ${balance.toFixed(2)}`);
}
