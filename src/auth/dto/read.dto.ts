import { ApiProperty } from "@nestjs/swagger";

export class ReadTokenDTO {
    @ApiProperty()
    accessToken: string;
}
