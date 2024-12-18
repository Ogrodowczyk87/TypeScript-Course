import { describe, it, expect } from 'vitest';
import { getCompilerDiagnostics } from '../../../utils/ts-utils.ts';
import { join } from 'path';

describe('Field Cleaner Type', () => {
  it('should compile when implemented', () => {
    const diagnostics = getCompilerDiagnostics(join(__dirname, 'task-pass.ts'));
    expect(diagnostics).toConfirmCompilation();
  });
});
