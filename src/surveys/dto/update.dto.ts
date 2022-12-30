import { IsDateString, IsOptional } from "class-validator";
import { AutoMap } from "@automapper/classes";
import { FeatureCollection, Polygon } from "geojson";
import { ApiProperty } from "@nestjs/swagger";

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
    content?: any;

    @ApiProperty()
    @AutoMap()
    @IsOptional()
    area?: FeatureCollection<Polygon>;
}
