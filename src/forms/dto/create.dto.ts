import { IsNotEmpty, IsArray, ValidateNested } from "class-validator";
import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { Question } from "@/forms/question.model";
import { Type } from "class-transformer";

export class CreateFormDTO {
    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @AutoMap()
    description: string;

    @ApiProperty({ type: [Question] })
    @AutoMap(() => [Question])
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Question)
    questions: Question[];
}
