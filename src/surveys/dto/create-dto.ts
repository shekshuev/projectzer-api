import { IsNotEmpty, IsDateString } from "class-validator";
import { AutoMap } from "@automapper/classes";
import { FeatureCollection, Polygon } from "geojson";

export class CreateSurveyDTO {
    @AutoMap()
    @IsNotEmpty()
    @IsDateString()
    beginDate: Date;

    @AutoMap()
    @IsNotEmpty()
    @IsDateString()
    endDate: Date;

    @AutoMap()
    @IsNotEmpty()
    title: string;

    @AutoMap()
    description: string;

    @AutoMap()
    content: any;

    @AutoMap()
    area: FeatureCollection<Polygon>;
}
