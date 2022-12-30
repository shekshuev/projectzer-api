import { IsDateString, IsArray, IsOptional, ValidateNested } from "class-validator";
import { AutoMap } from "@automapper/classes";
import { Question } from "@/surveys/question.model";
import { FeatureCollection } from "@/geojson/feature-collection";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class UpdateSurveyDTO {
    @ApiProperty()
    @AutoMap()
    @IsDateString()
    @IsOptional()
    beginDate?: string;

    @ApiProperty()
    @AutoMap()
    @IsDateString()
    @IsOptional()
    endDate?: string;

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

    @ApiProperty({ type: FeatureCollection })
    @AutoMap()
    @IsOptional()
    @ValidateNested()
    @Type(() => FeatureCollection)
    area?: FeatureCollection;
}
