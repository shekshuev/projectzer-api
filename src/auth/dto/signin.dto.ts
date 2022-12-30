import { IsNotEmpty, MinLength, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SigInDTO {
    @ApiProperty({ minLength: 5, maxLength: 20 })
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(20)
    userName: string;

    @ApiProperty({ minLength: 5, maxLength: 30 })
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(30)
    password: string;
}
