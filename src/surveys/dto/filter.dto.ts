import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsNumber } from "class-validator";

export class FilterSurveyDTO {
    @ApiProperty()
    @AutoMap()
    @IsOptional()
    @IsNumber()
    id?: number;

    @ApiProperty()
    @AutoMap()
    @IsOptional()
    title?: string;

    @ApiProperty()
    @AutoMap()
    @IsOptional()
    description?: string;

    @ApiProperty()
    @AutoMap()
    @IsOptional()
    latitude?: number;

    @ApiProperty()
    @AutoMap()
    @IsOptional()
    @IsNumber()
    longitude?: number;
}
