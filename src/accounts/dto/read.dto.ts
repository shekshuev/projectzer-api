import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@/enums/role.enum";

export class ReadAccountDTO {
    @ApiProperty()
    @AutoMap()
    id: number;

    @ApiProperty()
    @AutoMap()
    userName: string;

    @ApiProperty()
    @AutoMap()
    firstName: string;

    @ApiProperty()
    @AutoMap()
    lastName: string;

    @ApiProperty({ enum: [Role.Root, Role.Admin, Role.Interviewer] })
    @AutoMap()
    role: string;

    @ApiProperty()
    @AutoMap()
    resultsCount?: number;
}
