import { IsNotEmpty, IsDefined, IsDateString, IsArray, ValidateNested } from "class-validator";
import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { Question } from "@/surveys/question.model";
import { FeatureCollection } from "@/geojson/feature-collection";
import { Type } from "class-transformer";

export class CreateSurveyDTO {
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

    @ApiProperty({ type: FeatureCollection })
    @AutoMap()
    @IsDefined()
    @ValidateNested()
    @Type(() => FeatureCollection)
    area: FeatureCollection;
}
