import { AutoMap } from "@automapper/classes";
import { FeatureCollection } from "@/geojson/feature-collection";
import { ApiProperty } from "@nestjs/swagger";

export class ReadSurveyDTO {
    @ApiProperty()
    @AutoMap()
    id: number;

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
    formId: number;

    @ApiProperty()
    @AutoMap()
    formsCount: number;

    @ApiProperty({ type: FeatureCollection })
    @AutoMap()
    area: FeatureCollection;

    @ApiProperty()
    @AutoMap()
    createdAt: Date;

    @ApiProperty()
    @AutoMap()
    updatedAt: Date;
}
