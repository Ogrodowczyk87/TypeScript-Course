import { getProductCatalog, Product, ProductCatalog } from './product-catalog.js';

// Eksportujemy typy, aby były dostępne w całej aplikacji
export type { Product, ProductCatalog };
export type CatalogProducts = ReturnType<typeof getProductCatalog>['products'];

export function getTotalValue(): number {
  const catalog = getProductCatalog();
  return catalog.products.reduce((acc, product) => acc + product.price, 0);
}

// Funkcja do filtrowania produktów według kategorii
export function getProductsByCategory(category: string): Product[] {
  const catalog = getProductCatalog();
  return catalog.products.filter(product => product.category === category);
}

// Funkcja do sprawdzania dostępności produktu
export function isProductAvailable(productId: string): boolean {
  const catalog = getProductCatalog();
  const product = catalog.products.find(p => p.id === productId);
  return product ? product.inStock : false;
}
