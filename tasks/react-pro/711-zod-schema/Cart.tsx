import { z } from 'zod';

// Produkt w koszyku
export const CartItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1, 'Nazwa jest wymagana'),
  price: z.number().nonnegative(),
  quantity: z.number().nonnegative(),
});

// Cały koszyk + walidacje biznesowe
export const CartSchema = z
  .object({
    items: z.array(CartItemSchema).min(1, 'Koszyk nie może być pusty'),
    total: z
      .number()
      .refine((v) => v > 0, 'Łączna cena musi być większa od 0'),
  })
  .superRefine((data, ctx) => {
    const expected = data.items.reduce(
      (sum, it) => sum + (it.price || 0) * (it.quantity || 0),
      0,
    );
    if (data.items.length > 0 && data.total !== expected) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['total'],
        message: 'Łączna cena nie zgadza się z wartością produktów',
      });
    }
  });

export type CartItem = z.infer<typeof CartItemSchema>;
export type Cart = z.infer<typeof CartSchema>;