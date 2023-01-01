import { ApiProperty } from "@nestjs/swagger";
import { ReadResultDTO } from "@/results/dto/read.dto";

export class ReadResultListDTO {
    @ApiProperty()
    total: number;
    @ApiProperty({ type: [ReadResultDTO] })
    results: ReadResultDTO[];
}
