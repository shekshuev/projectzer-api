import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, MinLength, MaxLength, IsIn, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@/enums/role.enum";

export class CreateAccountDTO {
    @ApiProperty({ minLength: 5, maxLength: 20 })
    @AutoMap()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(20)
    userName: string;

    @ApiProperty({ required: false })
    @AutoMap()
    @IsOptional()
    firstName: string;

    @ApiProperty({ required: false })
    @AutoMap()
    @IsOptional()
    lastName: string;

    @ApiProperty({ enum: [Role.Admin, Role.Interviewer] })
    @AutoMap()
    @IsNotEmpty()
    @IsIn([Role.Admin, Role.Interviewer])
    role: string;

    @ApiProperty({ minLength: 5, maxLength: 30 })
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(30)
    password: string;

    @ApiProperty({ minLength: 5, maxLength: 30 })
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(30)
    confirmPassword: string;
}
