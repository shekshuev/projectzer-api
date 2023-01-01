import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { FilledQuestion } from "@/surveys/filled-question.model";
import { Type } from "class-transformer";
import { Feature } from "@/geojson/feature";

export class ReadFilledSurveyDTO {
    @ApiProperty()
    @AutoMap()
    id: number;

    @ApiProperty()
    @AutoMap()
    surveyId: number;

    @ApiProperty()
    @AutoMap()
    beginDate: Date;

    @ApiProperty()
    @AutoMap()
    endDate: Date;

    @ApiProperty()
    @AutoMap()
    completed: boolean;

    @ApiProperty({ type: Feature })
    @AutoMap()
    @Type(() => Feature)
    point: Feature;

    @ApiProperty({ type: [FilledQuestion] })
    @AutoMap(() => [FilledQuestion])
    @Type(() => FilledQuestion)
    questions: FilledQuestion[];
}
