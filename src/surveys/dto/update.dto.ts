import { IsDateString, IsOptional, ValidateNested, IsNumber, Min } from "class-validator";
import { AutoMap } from "@automapper/classes";
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

    @ApiProperty()
    @AutoMap()
    @IsOptional()
    @IsNumber()
    formId?: number;

    @ApiProperty()
    @AutoMap()
    @IsNumber()
    @Min(0)
    formsCount: number;

    @ApiProperty({ type: FeatureCollection })
    @AutoMap()
    @IsOptional()
    @ValidateNested()
    @Type(() => FeatureCollection)
    area?: FeatureCollection;
}
