/*
  Twoim zadaniem jest zrefaktoryzowanie istniejącego kodu w repository.ts: UserRepository i ProductRepository, tworząc generyczne repozytorium Repository<T>. 
  Nowe repozytorium powinno obsługiwać operacje CRUD dla dowolnego typu danych i tabeli w bazie danych. Podstawą zaliczenia jest obsługa:
  - getById
  - getAll
  - insert

  Podczas rozwiązywania zadania nie powinieneś modyfikować pliku DataAccess.ts (mockuje on bazę danych)
*/

import { MockDataAccess } from './DataAccess.ts';
import { ProductRepository, UserRepository } from './repository.ts';

(async () => {
  try {
    const dataAccess = new MockDataAccess();
    const userRepository = new UserRepository(dataAccess);
    const productRepository = new ProductRepository(dataAccess);

    const insertedUser = await userRepository.insert({
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
    });
    console.log('Inserted User:', insertedUser);

    const insertedProduct = await productRepository.insert({
      name: 'Smartphone',
      price: 699.99,
    });
    console.log('Inserted Product:', insertedProduct);

    const users = await userRepository.getAll();
    console.log('All Users:', users);

    const products = await productRepository.getAll();
    console.log('All Products:', products);
  } catch (error) {
    console.error('Error during operations:', error);
  }
})();
