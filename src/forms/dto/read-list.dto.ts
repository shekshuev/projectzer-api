import { ApiProperty } from "@nestjs/swagger";
import { ReadFormDTO } from "@/forms/dto/read.dto";

export class ReadFormListDTO {
    @ApiProperty()
    total: number;
    @ApiProperty({ type: [ReadFormDTO] })
    forms: ReadFormDTO[];
}
