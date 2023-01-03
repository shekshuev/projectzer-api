import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { ResultQuestion } from "@/results/result-question.model";
import { Type } from "class-transformer";
import { Feature } from "@/geojson/feature";

export class ReadResultDTO {
    @ApiProperty()
    @AutoMap()
    id: number;

    @ApiProperty()
    @AutoMap()
    surveyId: number;

    @ApiProperty()
    @AutoMap()
    accountId: number;

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

    @ApiProperty({ type: [ResultQuestion] })
    @AutoMap(() => [ResultQuestion])
    @Type(() => ResultQuestion)
    questions: ResultQuestion[];
}
