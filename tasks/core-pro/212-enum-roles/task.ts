export enum UserPermission {
  READ = 'read',
  WRITE = 'write',
  DELETE = 'delete',
  

}

export enum UserRole {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  VIEWER = 'VIEWER',
  READ = 'READ',
}

export interface User {
  role: UserRole;
  permissions: UserPermission[];
}

export function hasAccess(user: User, requiredPermission: UserPermission): boolean {
  if (user.role ===  UserRole.ADMIN) return true;
  return user.permissions.includes(requiredPermission);
}
