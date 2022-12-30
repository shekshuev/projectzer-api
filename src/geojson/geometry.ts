import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, IsArray, IsIn } from "class-validator";

export class Geometry {
    @ApiProperty({ enum: ["Point", "Polygon"] })
    @AutoMap()
    @IsNotEmpty()
    @IsIn(["Point", "Polygon"])
    type: string;

    @ApiProperty({ type: [Number] })
    @AutoMap()
    @IsArray()
    coordinates: [];
}
