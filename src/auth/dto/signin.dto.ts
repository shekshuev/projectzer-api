import { IsNotEmpty } from "class-validator";

export class SigInDto {
    @IsNotEmpty()
    userName: string;

    @IsNotEmpty()
    password: string;
}
