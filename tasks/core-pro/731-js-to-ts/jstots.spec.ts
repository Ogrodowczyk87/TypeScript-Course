import { describe, it, expect } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils.ts';
import { join } from 'path';
import { getTotalValue, type CatalogProducts } from './task.ts';

describe('JS Integration', () => {
  it('should allow to use JS files', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'task.ts'));
    expect(diagnostics).toConfirmCompilation();
  });

  it('should calculate total value of the catalog', () => {
    const total = getTotalValue();
    expect(total).toBe(300); // Zmień wartość na podstawie danych w `product-catalog.js`
  });

  it('should allow me to use types from JS files', () => {
    const catalog: CatalogProducts = [
      {
        id: '1',
        name: 'Product 1',
        price: 100,
        category: 'Category 1',
        inStock: true,
      },
    ];
    expect(catalog).toHaveLength(1);
  });
});
