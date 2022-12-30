import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, IsArray, IsIn, ValidateNested } from "class-validator";
import { Feature } from "@/geojson/feature";
import { Type } from "class-transformer";

export class FeatureCollection {
    @ApiProperty({ enum: ["FeatureCollection"] })
    @AutoMap()
    @IsNotEmpty()
    @IsIn(["FeatureCollection"])
    type: string;

    @ApiProperty({ type: [Feature] })
    @AutoMap(() => [Feature])
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Feature)
    features: Feature[];
}
