export abstract class PasswordService {
  abstract compare(
    rawPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  abstract hash(password: string, salt?: string): Promise<string>;
}
