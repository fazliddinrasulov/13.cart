export const getTotals = (cart: any) => {
  let totalAmount = 0;
  let totalCost = 0;
  for (const item of cart.values()) {
    totalAmount += item.amount;
    totalCost += item.amount * item.price;
  }
  return { totalAmount, totalCost };
};
