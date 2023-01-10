import { IsNotEmpty, IsDefined, IsDateString, IsNumber, ValidateNested, Min, IsOptional } from "class-validator";
import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
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
    @IsOptional()
    description: string;

    @ApiProperty()
    @AutoMap()
    @IsNumber()
    formId: number;

    @ApiProperty()
    @AutoMap()
    @IsNumber()
    @Min(0)
    formsCount: number;

    @ApiProperty({ type: FeatureCollection })
    @AutoMap()
    @IsDefined()
    @ValidateNested()
    @Type(() => FeatureCollection)
    area: FeatureCollection;
}
