function transformData(
  arr: TransformingData[],
  transFn: (order: TransformingData) => TransformingData
): number {
  return arr
    .filter(order => order.status === Status.Completed)
    .map(order => transFn(order))
    .reduce((sum, order) => sum + order.amount, 0);
}

const addCommission = (order: TransformingData): TransformingData => ({
  ...order,
  amount: order.amount * 1.1
});

const orders: TransformingData[] = [
  { id: 1, amount: 100, status: Status.Completed },
  { id: 2, amount: 200, status: Status.Pending },
  { id: 3, amount: 150, status: Status.Completed },
  { id: 4, amount: 50, status: Status.Pending }
];

const result = transformData(orders, addCommission);
console.log(result); // 275