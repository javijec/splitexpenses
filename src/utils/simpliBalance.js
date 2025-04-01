const simplifyBalance = (balances) => {
  // Paso 2: Simplificar las transacciones
  // Separamos a las personas en acreedores (balance > 0) y deudores (balance < 0)
  let creditors = [];
  let debtors = [];

  // Procesamos el array de balances
  balances.forEach(({ id, amount, displayName }) => {
    if (amount > 0) {
      creditors.push({ id, amount, displayName });
    } else if (amount < 0) {
      // Guardamos el monto como positivo para facilitar los cálculos
      debtors.push({ id, amount: -amount, displayName });
    }
  });

  // Array para almacenar las transacciones simplificadas
  const transactions = [];

  // Algoritmo de compensación: mientras haya deudores y acreedores
  let i = 0,
    j = 0;
  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];

    // Se transfiere la mínima cantidad entre lo que debe y lo que le corresponde recibir
    const amount = Math.min(debtor.amount, creditor.amount);
    transactions.push({
      from: debtor.id,
      fromName: debtor.displayName,
      to: creditor.id,
      toName: creditor.displayName,
      amount,
    });

    // Actualizamos los montos
    debtor.amount -= amount;
    creditor.amount -= amount;

    // Si el deudor ya saldó su deuda, avanzamos al siguiente
    if (debtor.amount === 0) {
      i++;
    }
    // Si el acreedor ya recibió lo que le correspondía, avanzamos al siguiente
    if (creditor.amount === 0) {
      j++;
    }
  }
  // Devolvemos el array de transacciones simplificadas
  return transactions;
};

export default simplifyBalance;
