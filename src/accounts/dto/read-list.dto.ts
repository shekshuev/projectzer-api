import { ApiProperty } from "@nestjs/swagger";
import { ReadAccountDTO } from "@/accounts/dto/read.dto";

export class ReadAccountListDTO {
    @ApiProperty()
    total: number;
    @ApiProperty({ type: [ReadAccountDTO] })
    accounts: ReadAccountDTO[];
}
