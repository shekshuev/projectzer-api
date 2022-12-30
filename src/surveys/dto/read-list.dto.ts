import { ApiProperty } from "@nestjs/swagger";
import { ReadSurveyDTO } from "@/surveys/dto/read.dto";

export class ReadSurveyListDTO {
    @ApiProperty()
    total: number;
    @ApiProperty({ type: [ReadSurveyDTO] })
    surveys: ReadSurveyDTO[];
}
