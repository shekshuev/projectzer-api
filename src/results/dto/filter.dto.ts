import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsNumber, IsDateString } from "class-validator";

export class FilterResultDTO {
    @ApiProperty()
    @AutoMap()
    @IsOptional()
    @IsNumber()
    id?: number;

    @ApiProperty()
    @AutoMap()
    @IsOptional()
    @IsNumber()
    surveyId?: number;

    @ApiProperty()
    @AutoMap()
    @IsOptional()
    @IsNumber()
    accountId?: number;

    @ApiProperty()
    @AutoMap()
    @IsOptional()
    @IsDateString()
    beginDate: string;

    @ApiProperty()
    @AutoMap()
    @IsOptional()
    @IsDateString()
    endDate: string;
}
