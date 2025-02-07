// Zaimplementuj typ mapowany type FieldExtender<T, K>, który dla podanego typu T tworzy nowy typ rozszerzony - 
// lista pól jest taka sama, ale zamiast typów prostych każde pole staje się typem złożonym z dodatkowym polem “value”. 
// Dostępne testy i kod przedstawiają docelowy obiekt, 
// którego kompilacja powinna zostać przez ciebie odblokowana

type Person = {
  firstName: string;
  lastName: string;
};

type FieldExtender<T, K> = {
  [P in keyof T]: {
    value: T[P];
  } & K;
};

type PersonUpdateHistory = FieldExtender<
  Person,
  {
    isUpdated: boolean;
    updatedAt: number | null;
  }
>;

export const history: PersonUpdateHistory = {
  firstName: {
    value: 'John',
    isUpdated: false,
    updatedAt: null,
  },
  lastName: {
    value: 'Doe',
    isUpdated: true,
    updatedAt: new Date().getTime(),
  },
};


