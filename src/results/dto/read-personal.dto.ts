import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { ResultQuestion } from "@/results/result-question.model";
import { Type } from "class-transformer";
import { Feature } from "@/geojson/feature";
import { ReadSurveyDTO } from "@/surveys/dto/read.dto";

export class ReadPersonalResultDTO {
    @ApiProperty()
    @AutoMap()
    id: number;

    @ApiProperty()
    @AutoMap()
    survey: ReadSurveyDTO;

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
