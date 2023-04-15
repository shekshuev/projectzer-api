import { AutoMap } from "@automapper/classes";
import { QuestionType } from "@/enums/question.enum";
import {
    IsNotEmpty,
    IsIn,
    IsBoolean,
    IsArray,
    ArrayMinSize,
    ValidateNested,
    IsOptional,
    IsPositive
} from "class-validator";
import { Answer } from "@/forms/answer.model";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class Question {
    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ enum: [QuestionType.Multiple, QuestionType.Single, QuestionType.Open] })
    @AutoMap()
    @IsNotEmpty()
    @IsIn([QuestionType.Multiple, QuestionType.Single, QuestionType.Open])
    type: string;

    @ApiProperty()
    @IsOptional()
    @IsPositive()
    minCount?: number;

    @ApiProperty()
    @IsOptional()
    @IsPositive()
    maxCount?: number;

    @ApiProperty()
    @AutoMap()
    @IsBoolean()
    required: boolean;

    @ApiProperty({ type: [Answer] })
    @AutoMap()
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => Answer)
    answers: Answer[];

    @ApiProperty({ type: [String] })
    @AutoMap()
    @IsArray()
    @IsOptional()
    @Type(() => String)
    isIgnore: string[] | null;
}
