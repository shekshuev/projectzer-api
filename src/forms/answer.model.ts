import { AutoMap } from "@automapper/classes";
import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class Answer {
    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    text: string;

    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    code: string;
}
