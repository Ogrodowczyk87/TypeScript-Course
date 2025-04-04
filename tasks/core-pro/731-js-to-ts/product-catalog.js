import { readFileSync } from 'fs';

/**
 * @typedef {Object} Product
 * @property {string} id - Unikalny identyfikator produktu
 * @property {string} name - Nazwa produktu
 * @property {number} price - Cena produktu
 * @property {string} category - Kategoria produktu
 * @property {boolean} inStock - Czy produkt jest dostępny
 */

/**
 * @typedef {Object} ProductCatalog
 * @property {Product[]} products - Lista produktów
 * @property {string} lastUpdated - Data ostatniej aktualizacji katalogu
 */

/**
 * Pobiera katalog produktów
 * @returns {ProductCatalog} Katalog produktów
 */
export function getProductCatalog() {
  return {
    products: [
      { id: '1', name: 'Product 1', price: 100, category: 'Category 1', inStock: true },
      { id: '2', name: 'Product 2', price: 200, category: 'Category 2', inStock: false },
    ],
    lastUpdated: '2025-04-04',
  };
}
