export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

export interface ProductCatalog {
  products: Product[];
  lastUpdated: string; // Zakładam, że data jest przechowywana jako string
}

export function getProductCatalog(): ProductCatalog;