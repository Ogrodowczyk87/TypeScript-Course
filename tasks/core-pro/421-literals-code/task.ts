

export type Code = '110-111-001' | '000-000-101' | '011-100-101';

export function codeToDecimal(code: Code): string {
  const parts = code.split('-');
  const decimalParts = parts.map(part => parseInt(part, 2).toString());
  return decimalParts.join('');
}