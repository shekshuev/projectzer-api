import { IsNotEmpty, IsDateString } from "class-validator";
import { AutoMap } from "@automapper/classes";
import { FeatureCollection, Polygon } from "geojson";
import { ApiProperty } from "@nestjs/swagger";

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

    @ApiProperty()
    @AutoMap()
    content: any;

    @ApiProperty()
    @AutoMap()
    area: FeatureCollection<Polygon>;
}
