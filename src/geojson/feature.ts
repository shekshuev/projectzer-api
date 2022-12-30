import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, IsOptional, IsDefined, IsIn, ValidateNested } from "class-validator";
import { Geometry } from "@/geojson/geometry";
import { Type } from "class-transformer";

export class Feature {
    @ApiProperty({ enum: ["Feature"] })
    @AutoMap()
    @IsNotEmpty()
    @IsIn(["Feature"])
    type: string;

    @ApiProperty({ type: Geometry })
    @AutoMap()
    @IsDefined()
    @ValidateNested()
    @Type(() => Geometry)
    geometry: Geometry;

    @ApiProperty()
    @AutoMap()
    @IsOptional()
    properties?: any;
}
