import { ApiProperty } from "@nestjs/swagger";
import { ReadPersonalResultDTO } from "@/results/dto/read-personal.dto";

export class ReadPersonalResultListDTO {
    @ApiProperty()
    total: number;
    @ApiProperty({ type: [ReadPersonalResultDTO] })
    results: ReadPersonalResultDTO[];
}
