import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, forMember, ignore, Mapper } from "@automapper/core";
import { Injectable } from "@nestjs/common";
import { Account } from "./account.entity";
import { ReadAccountDto } from "./dto/read-dto";
import { CreateAccountDto } from "./dto/create-dto";
import { UpdateAccountDto } from "./dto/update-dto";

@Injectable()
export class AccountProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return mapper => {
            createMap(mapper, Account, ReadAccountDto);
            createMap(
                mapper,
                CreateAccountDto,
                Account,
                forMember(dest => dest.id, ignore())
            );
            createMap(mapper, UpdateAccountDto, Account);
        };
    }
}
