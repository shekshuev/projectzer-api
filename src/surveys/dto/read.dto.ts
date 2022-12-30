import { AutoMap } from "@automapper/classes";
import { FeatureCollection, Polygon } from "geojson";
import { ApiProperty } from "@nestjs/swagger";

export class ReadSurveyDTO {
    @ApiProperty()
    @AutoMap()
    id: number;

    @ApiProperty()
    @AutoMap()
    createdAt: Date;

    @ApiProperty()
    @AutoMap()
    beginDate: Date;

    @ApiProperty()
    @AutoMap()
    endDate: Date;

    @ApiProperty()
    @AutoMap()
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
