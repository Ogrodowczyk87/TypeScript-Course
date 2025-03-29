/* Zmień sposób upewnienia się, że obiekt shapes jest zgodny z typem Record<string, Shape>
  Wykorzytaj technikę, która zachowa szczegółowe informacje o obiektach przy odwoływaniu się do nich.
*/

type Rectangle = { kind: 'rectangle'; width: number; height: number };
type Circle = { kind: 'circle'; radius: number };
type Shape = Rectangle | Circle;

const shapes = {
  shape1: { kind: 'rectangle', width: 10, height: 20 },
  shape2: { kind: 'circle', radius: 15 },
} satisfies Record<string, Shape>;

console.log(shapes.shape1.width);
