import { ApiProperty } from "@nestjs/swagger";
import { ReadAvailableSurveyDTO } from "@/surveys/dto/read-available.dto";

export class ReadAvailableSurveyListDTO {
    @ApiProperty()
    total: number;
    @ApiProperty({ type: [ReadAvailableSurveyDTO] })
    surveys: ReadAvailableSurveyDTO[];
}
