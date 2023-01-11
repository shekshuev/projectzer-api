import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsNumber } from "class-validator";

export class FilterAccountDTO {
    @ApiProperty()
    @AutoMap()
    @IsOptional()
    @IsNumber()
    id?: number;

    @ApiProperty()
    @AutoMap()
    @IsOptional()
    name?: string;

    @ApiProperty()
    @AutoMap()
    @IsOptional()
    role?: string;
}
