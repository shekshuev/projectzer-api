import { IsNotEmpty, IsDefined, IsDateString, IsBoolean, ValidateNested, IsNumber, IsArray } from "class-validator";
import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { FilledQuestion } from "@/surveys/filled-question.model";
import { Type } from "class-transformer";
import { Feature } from "@/geojson/feature";

export class CreateFilledSurveyDTO {
    @ApiProperty()
    @AutoMap()
    @IsNumber()
    surveyId: number;

    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    @IsDateString()
    beginDate: string;

    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    @IsDateString()
    endDate: string;

    @ApiProperty()
    @AutoMap()
    @IsBoolean()
    completed: boolean;

    @ApiProperty({ type: Feature })
    @AutoMap()
    @IsDefined()
    @ValidateNested()
    @Type(() => Feature)
    point: Feature;

    @ApiProperty({ type: [FilledQuestion] })
    @AutoMap(() => [FilledQuestion])
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => FilledQuestion)
    questions: FilledQuestion[];
}
