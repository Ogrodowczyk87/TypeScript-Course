// export type FieldTypeCleaner<T, K> = {
//   [Prop in keyof T]: T[Prop];
// };
export type FieldTypeCleaner<T, K> = {
  [P in keyof T as T[P] extends K ? never : P]: T[P];
};

