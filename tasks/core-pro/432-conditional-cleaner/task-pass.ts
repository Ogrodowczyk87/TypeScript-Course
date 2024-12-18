import { FieldTypeCleaner } from './task.ts';

type Phone = {
  brand: string;
  model: string;
  price: number;
};

type JustPhonePrice = FieldTypeCleaner<Phone, string>;
const phone1: JustPhonePrice = {
  price: 999,
};

type Person = {
  name: string;
  age: number;
  isActive: boolean;
};

type JustPersonName = FieldTypeCleaner<Person, number | boolean>;
const person1: JustPersonName = {
  name: 'John',
};
