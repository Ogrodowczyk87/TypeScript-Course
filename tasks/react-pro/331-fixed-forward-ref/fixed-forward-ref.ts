import { 
  forwardRef, 
  ForwardRefRenderFunction, 
  PropsWithoutRef, 
  RefAttributes 
} from 'react';

// Specjalny typ generyczny naprawiający inferencję ref
type FixedForwardRefComponent<TRef, TProps> = 
  (props: PropsWithoutRef<TProps> & RefAttributes<TRef>) => React.ReactElement | null;

export function fixedForwardRef<TRef, TProps extends {} = {}>(
  render: ForwardRefRenderFunction<TRef, PropsWithoutRef<TProps>>
): FixedForwardRefComponent<TRef, TProps> {
  return forwardRef(render) as FixedForwardRefComponent<TRef, TProps>;
}
