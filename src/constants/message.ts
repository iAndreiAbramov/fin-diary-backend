export const Message = {
  UserWithEmailExists: (email: string): string => `Пользователь с email: ${email} уже существует`,
  UserWithEmailNotFound: (email: string): string => `Пользователь с email: ${email} не найден`,
  UserWithIdNotFound: (id: number): string => `Польщователь с id: ${id} не найден`,
  PasswordIsIncorrect: () => 'Email или пароль указаны неверно',
} as const;
