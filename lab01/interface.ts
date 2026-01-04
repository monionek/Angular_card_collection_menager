type SaleRecord = {
  product: string;
  region: string;
  sales: number;
};

type ProductSummary = {
  product: string;
  totalSales: number;
};
enum Status {
  Pending = 'pending',
  Completed = 'completed',
  Canceled = 'canceled'
}

interface TransformingData {
  id: number;
  amount: number;
  status: Status;
}