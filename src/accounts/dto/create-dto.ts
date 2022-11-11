import { AutoMap } from "@automapper/classes";
import { IsNotEmpty } from "class-validator";

export class CreateAccountDto {
    @AutoMap()
    @IsNotEmpty()
    userName: string;

    @AutoMap()
    firstName?: string;

    @AutoMap()
    lastName?: string;

    @AutoMap()
    @IsNotEmpty()
    role: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    confirmPassword: string;
}
