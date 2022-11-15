import { IsNotEmpty, IsDateString } from "class-validator";
import { AutoMap } from "@automapper/classes";
import { FeatureCollection, Polygon } from "geojson";

export class UpdateSurveyDTO {
    @AutoMap()
    @IsDateString()
    beginDate: Date;

    @AutoMap()
    @IsDateString()
    endDate: Date;

    @AutoMap()
    title: string;

    @AutoMap()
    description: string;

    @AutoMap()
    content: any;

    @AutoMap()
    area: FeatureCollection<Polygon>;
}
