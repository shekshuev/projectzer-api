import { AutoMap } from "@automapper/classes";
import { ValidateNested, IsOptional, IsDefined, IsArray } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { Question } from "@/forms/question.model";

export class ResultQuestion {
    @ApiProperty({ type: Question })
    @AutoMap()
    @IsDefined()
    @ValidateNested()
    @Type(() => Question)
    question: Question;

    @ApiProperty()
    @AutoMap()
    @IsOptional()
    selectedAnswer: any;

    @ApiProperty()
    @AutoMap()
    @IsArray()
    beginDates: [];

    @ApiProperty()
    @AutoMap()
    @IsArray()
    endDates: [];
}
