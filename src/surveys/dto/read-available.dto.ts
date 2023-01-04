import { AutoMap } from "@automapper/classes";
import { FeatureCollection } from "@/geojson/feature-collection";
import { ApiProperty } from "@nestjs/swagger";
import { ReadFormDTO } from "@/forms/dto/read.dto";

export class ReadAvailableSurveyDTO {
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
    form: ReadFormDTO;

    @ApiProperty()
    @AutoMap()
    formsCount: number;

    @ApiProperty({ type: FeatureCollection })
    @AutoMap()
    area: FeatureCollection;
}
