import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Account } from "./account.entity";
import { CreateAccountDto } from "./dto/create-dto";
import { UpdateAccountDto } from "./dto/update-dto";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { CryptoService } from "src/crypto/crypto.service";

@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(Account)
        private readonly accountsRepository: Repository<Account>,
        @InjectMapper() private readonly classMapper: Mapper,
        private readonly cryptoService: CryptoService
    ) {}

    async findAll(count: number, offset: number): Promise<[Account[], number]> {
        return this.accountsRepository.findAndCount({
            take: count,
            skip: offset
        });
    }

    async findOne(id: number): Promise<Account> {
        return this.accountsRepository.findOneByOrFail({ id: id });
    }

    async findOneByUserName(userName: string): Promise<Account> {
        return this.accountsRepository.findOneByOrFail({ userName });
    }

    async create(createAccountDto: CreateAccountDto): Promise<void> {
        if (createAccountDto.password !== createAccountDto.confirmPassword) {
            throw Error("Passwords doesn't match!");
        } else if (!["admin", "interviewer"].includes(createAccountDto.role)) {
            throw Error("Wrong account role!");
        } else {
            const account = this.classMapper.map(createAccountDto, CreateAccountDto, Account);
            account.passwordHash = await this.cryptoService.hashPassword(createAccountDto.password);
            await this.accountsRepository.save(account);
        }
    }

    async update(id: number, updateAccountDto: UpdateAccountDto): Promise<void> {
        if (updateAccountDto.password !== updateAccountDto.confirmPassword) {
            throw Error("Passwords doesn't match!");
        } else if (updateAccountDto.role && !["admin", "interviewer"].includes(updateAccountDto.role)) {
            throw Error("Wrong account role!");
        } else {
            const account = await this.accountsRepository.findOneByOrFail({ id: id });
            for (const prop in updateAccountDto) {
                if (account.hasOwnProperty(prop) && !!updateAccountDto[prop]) {
                    if (prop === "password") {
                        account.passwordHash = await this.cryptoService.hashPassword(updateAccountDto.password);
                    } else if (prop === "confirmPassword") {
                        continue;
                    } else {
                        account[prop] = updateAccountDto[prop];
                    }
                }
            }
            await this.accountsRepository.save(account);
        }
    }

    async remove(id: number): Promise<void> {
        const account = await this.accountsRepository.findOneByOrFail({ id: id });
        await this.accountsRepository.remove(account);
    }
}
