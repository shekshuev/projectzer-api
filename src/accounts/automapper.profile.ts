import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { createMap, forMember, ignore, Mapper } from "@automapper/core";
import { Injectable } from "@nestjs/common";
import { Account } from "@/accounts/account.entity";
import { ReadAccountDTO } from "@/accounts/dto/read.dto";
import { CreateAccountDTO } from "@/accounts/dto/create.dto";
import { UpdateAccountDTO } from "@/accounts/dto/update.dto";

@Injectable()
export class AccountProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return mapper => {
            createMap(mapper, Account, ReadAccountDTO);
            createMap(
                mapper,
                CreateAccountDTO,
                Account,
                forMember(dest => dest.id, ignore())
            );
            createMap(mapper, UpdateAccountDTO, Account);
        };
    }
}
