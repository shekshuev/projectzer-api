import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { MinLength, MaxLength, IsIn, IsOptional } from "class-validator";
import { Role } from "@/enums/role.enum";

export class UpdateAccountDTO {
    @ApiProperty({ required: false, minLength: 5, maxLength: 20 })
    @AutoMap()
    @MinLength(5)
    @MaxLength(20)
    @IsOptional()
    userName?: string;

    @ApiProperty({ required: false })
    @AutoMap()
    @IsOptional()
    firstName?: string;

    @ApiProperty({ required: false })
    @AutoMap()
    @IsOptional()
    lastName?: string;

    @ApiProperty({ required: false, enum: [Role.Root, Role.Admin, Role.Interviewer] })
    @AutoMap()
    @IsIn([Role.Root, Role.Admin, Role.Interviewer])
    @IsOptional()
    role?: string;

    @ApiProperty({ required: false, minLength: 5, maxLength: 30 })
    @MinLength(5)
    @MaxLength(30)
    @IsOptional()
    password?: string;

    @ApiProperty({ required: false, minLength: 5, maxLength: 30 })
    @MinLength(5)
    @MaxLength(30)
    @IsOptional()
    confirmPassword?: string;
}
