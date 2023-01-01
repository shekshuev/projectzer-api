import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, forMember, ignore, Mapper } from "@automapper/core";
import { Injectable } from "@nestjs/common";
import { Form } from "@/forms/form.entity";
import { ReadFormDTO } from "@/forms/dto/read.dto";
import { CreateFormDTO } from "@/forms/dto/create.dto";
import { UpdateFormDTO } from "@/forms/dto/update.dto";

@Injectable()
export class FormsProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return mapper => {
            createMap(mapper, Form, ReadFormDTO);
            createMap(
                mapper,
                CreateFormDTO,
                Form,
                forMember(dest => dest.id, ignore())
            );
            createMap(mapper, UpdateFormDTO, Form);
        };
    }
}
