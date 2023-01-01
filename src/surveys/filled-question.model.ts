import { AutoMap } from "@automapper/classes";
import { ValidateNested, IsOptional, IsDefined } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { Question } from "@/surveys/question.model";
import { Answer } from "@/surveys/answer.model";

export class FilledQuestion {
    @ApiProperty({ type: Question })
    @AutoMap()
    @IsDefined()
    @ValidateNested()
    @Type(() => Question)
    question: Question;

    @ApiProperty({ type: Answer })
    @AutoMap()
    @IsOptional()
    @ValidateNested()
    @Type(() => Answer)
    selectedAnswer: Answer;

    @ApiProperty()
    @AutoMap()
    @IsDefined()
    beginDate: Date;

    @ApiProperty()
    @AutoMap()
    @IsDefined()
    endDate: Date;
}
