import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ResultAnswer {
    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    text: string;

    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    code: string;

    @ApiProperty({ required: false })
    @AutoMap()
    @IsOptional()
    inputText?: string;
}
