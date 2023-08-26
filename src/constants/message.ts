export const Message = {
  UserWithEmailExists: (email: string): string => `User with email: ${email} already exists`,
  UserWithEmailNotFound: (email: string): string => `User with email: ${email} not found`,
  PasswordIsIncorrect: () => 'Password is incorrect',
} as const;
