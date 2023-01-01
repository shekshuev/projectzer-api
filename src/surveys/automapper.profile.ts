import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, forMember, ignore, Mapper, mapFrom } from "@automapper/core";
import { Injectable } from "@nestjs/common";
import { Survey } from "@/surveys/survey.entity";
import { FilledSurvey } from "@/surveys/survey-filled.entity";
import { ReadSurveyDTO } from "@/surveys/dto/read.dto";
import { ReadFilledSurveyDTO } from "@/surveys/dto/read-filled.dto";
import { CreateSurveyDTO } from "@/surveys/dto/create.dto";
import { CreateFilledSurveyDTO } from "@/surveys/dto/create-filled.dto";
import { UpdateSurveyDTO } from "@/surveys/dto/update.dto";

@Injectable()
export class SurveyProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return mapper => {
            createMap(mapper, Survey, ReadSurveyDTO);
            createMap(
                mapper,
                CreateSurveyDTO,
                Survey,
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
            createMap(
                mapper,
                UpdateSurveyDTO,
                Survey,
                forMember(
                    dest => dest.beginDate,
                    mapFrom(source => new Date(Date.parse(source.beginDate)))
                ),
                forMember(
                    dest => dest.endDate,
                    mapFrom(source => new Date(Date.parse(source.endDate)))
                )
            );
            createMap(mapper, FilledSurvey, ReadFilledSurveyDTO);
            createMap(
                mapper,
                CreateFilledSurveyDTO,
                FilledSurvey,
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
