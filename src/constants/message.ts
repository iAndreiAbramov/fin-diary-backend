export const Message = {
  UserWithEmailExists: (email: string): string => `User with email: ${email} already exists`,
  UserWithEmailNotFound: (email: string): string => `User with email: ${email} not found`,
  UserWithIdNotFound: (id: number): string => `User with id: ${id} not found`,
  PasswordIsIncorrect: () => 'Password is incorrect',
} as const;
