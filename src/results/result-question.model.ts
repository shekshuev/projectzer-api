import { AutoMap } from "@automapper/classes";
import { ValidateNested, IsOptional, IsDefined } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { Question } from "@/forms/question.model";
import { ResultAnswer } from "@/results/result-answer.model";

export class ResultQuestion {
    @ApiProperty({ type: Question })
    @AutoMap()
    @IsDefined()
    @ValidateNested()
    @Type(() => Question)
    question: Question;

    @ApiProperty({ type: ResultAnswer })
    @AutoMap()
    @IsOptional()
    @ValidateNested()
    @Type(() => ResultAnswer)
    selectedAnswer: ResultAnswer;

    @ApiProperty()
    @AutoMap()
    @IsDefined()
    beginDate: Date;

    @ApiProperty()
    @AutoMap()
    @IsDefined()
    endDate: Date;
}
