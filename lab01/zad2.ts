function processSales(data: SaleRecord[]): ProductSummary[] {
  const allRegions = new Set<string>(
    data.map(item => item.region)
  );

  const productMap = new Map<
    string,
    { regions: Set<string>; totalSales: number }
  >();

  data.forEach(({ product, region, sales }) => {
    if (!productMap.has(product)) {
      productMap.set(product, {
        regions: new Set(),
        totalSales: 0
      });
    }

    const entry = productMap.get(product)!;
    entry.regions.add(region);
    entry.totalSales += sales;
  });

  const result: ProductSummary[] = [];

  productMap.forEach((value, product) => {
    if (value.regions.size === allRegions.size) {
      result.push({
        product,
        totalSales: value.totalSales
      });
    }
  });

  return result.sort(
    (a, b) => b.totalSales - a.totalSales
  );
}

const salesData: SaleRecord[] = [
  { product: 'A', region: 'North', sales: 100 },
  { product: 'A', region: 'South', sales: 150 },
  { product: 'A', region: 'East', sales: 120 },
  { product: 'B', region: 'North', sales: 200 },
  { product: 'B', region: 'South', sales: 250 },
  { product: 'C', region: 'North', sales: 300 }
];

console.log(processSales(salesData));
