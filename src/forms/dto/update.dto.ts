import { IsArray, IsOptional, ValidateNested } from "class-validator";
import { AutoMap } from "@automapper/classes";
import { Question } from "@/forms/question.model";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class UpdateFormDTO {
    @ApiProperty()
    @AutoMap()
    @IsOptional()
    title?: string;

    @ApiProperty()
    @AutoMap()
    @IsOptional()
    description?: string;

    @ApiProperty({ type: [Question] })
    @AutoMap(() => [Question])
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Question)
    questions?: Question[];
}
