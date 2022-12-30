import { AutoMap } from "@automapper/classes";
import { FeatureCollection } from "@/geojson/feature-collection";
import { ApiProperty } from "@nestjs/swagger";
import { Question } from "@/surveys/question.model";

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

    @ApiProperty({ type: [Question] })
    @AutoMap(() => [Question])
    questions: Question[];

    @ApiProperty({ type: FeatureCollection })
    @AutoMap()
    area: FeatureCollection;
}
