import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, forMember, ignore, Mapper, mapFrom, mapWith } from "@automapper/core";
import { Injectable } from "@nestjs/common";
import { Result } from "@/results/result.entity";
import { ReadResultDTO } from "@/results/dto/read.dto";
import { ReadPersonalResultDTO } from "@/results/dto/read-personal.dto";
import { CreateResultDTO } from "@/results/dto/create.dto";
import { ReadSurveyDTO } from "@/surveys/dto/read.dto";
import { Survey } from "@/surveys/survey.entity";

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
                Result,
                ReadPersonalResultDTO,
                forMember(
                    dest => dest.survey,
                    mapWith(ReadSurveyDTO, Survey, source => source.survey)
                )
            );
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
