import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, forMember, ignore, Mapper } from "@automapper/core";
import { Injectable } from "@nestjs/common";
import { Survey } from "./survey.entity";
import { ReadSurveyDTO } from "./dto/read-dto";
import { CreateSurveyDTO } from "./dto/create-dto";

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
                forMember(dest => dest.id, ignore())
            );
        };
    }
}
