import { ApiProperty } from "@nestjs/swagger";
import { ReadFilledSurveyDTO } from "@/surveys/dto/read-filled.dto";

export class ReadFilledSurveyListDTO {
    @ApiProperty()
    total: number;
    @ApiProperty({ type: [ReadFilledSurveyDTO] })
    surveys: ReadFilledSurveyDTO[];
}
