import { UserModule } from './task.ts';

const userModule = new UserModule();

userModule.addUser({ id: 1, name: 'John' });
userModule.addUser({ id: 2, name: 'Jane' });
userModule.addUser({ id: 3, name: 'Jim' });

userModule.removeUser(2);

userModule.filterUsers((user) => ({ isValid: user.name.startsWith('J') }));

