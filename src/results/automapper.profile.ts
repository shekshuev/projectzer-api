import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, forMember, ignore, Mapper, mapFrom } from "@automapper/core";
import { Injectable } from "@nestjs/common";
import { Result } from "@/results/result.entity";
import { ReadResultDTO } from "@/results/dto/read.dto";
import { CreateResultDTO } from "@/results/dto/create.dto";

@Injectable()
export class ResultsProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return mapper => {
            createMap(mapper, Result, ReadResultDTO);
            createMap(
                mapper,
                CreateResultDTO,
                Result,
                forMember(dest => dest.id, ignore()),
                forMember(
                    dest => dest.beginDate,
                    mapFrom(source => new Date(Date.parse(source.beginDate)))
                ),
                forMember(
                    dest => dest.endDate,
                    mapFrom(source => new Date(Date.parse(source.endDate)))
                )
            );
        };
    }
}
