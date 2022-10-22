export class CreateAccountDto {
    userName: string;

    firstName?: string;

    middleName?: string;

    lastName?: string;

    role: string;

    password: string;

    confirmPassword: string;
}
