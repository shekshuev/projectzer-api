export class CreateAccountDto {
    userName: string;

    firstName?: string;

    lastName?: string;

    role: string;

    password: string;

    confirmPassword: string;
}
