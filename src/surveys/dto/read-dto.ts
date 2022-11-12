import { AutoMap } from "@automapper/classes";
import { FeatureCollection, Polygon } from "geojson";

export class ReadSurveyDTO {
    @AutoMap()
    id: number;

    @AutoMap()
    createdAt: Date;

    @AutoMap()
    beginDate: Date;

    @AutoMap()
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
