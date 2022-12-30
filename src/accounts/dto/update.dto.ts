import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { MinLength, MaxLength, IsIn } from "class-validator";
import { Role } from "@/enums/role.enum";

export class UpdateAccountDTO {
    @ApiProperty({ required: false, minLength: 5, maxLength: 20 })
    @AutoMap()
    @MinLength(5)
    @MaxLength(20)
    userName?: string;

    @ApiProperty({ required: false })
    @AutoMap()
    firstName?: string;

    @ApiProperty({ required: false })
    @AutoMap()
    lastName?: string;

    @ApiProperty({ required: false, enum: [Role.Admin, Role.Interviewer] })
    @AutoMap()
    @IsIn([Role.Admin, Role.Interviewer])
    role?: string;

    @ApiProperty({ required: false, minLength: 5, maxLength: 30 })
    @MinLength(5)
    @MaxLength(30)
    password?: string;

    @ApiProperty({ required: false, minLength: 5, maxLength: 30 })
    @MinLength(5)
    @MaxLength(30)
    confirmPassword?: string;
}
