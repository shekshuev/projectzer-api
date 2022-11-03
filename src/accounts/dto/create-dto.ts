import { AutoMap } from "@automapper/classes";

export class CreateAccountDto {
    @AutoMap()
    userName: string;

    @AutoMap()
    firstName?: string;

    @AutoMap()
    lastName?: string;

    @AutoMap()
    role: string;

    password: string;

    confirmPassword: string;
}
