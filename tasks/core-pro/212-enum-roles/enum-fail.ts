import { hasAccess, User } from './task.ts';

const userEditor: User = {
  role: 'editor',
  permissions: ['READ', 'write'],
};

const userViewer: User = {
  role: 'reader',
  permissions: ['read'],
};
