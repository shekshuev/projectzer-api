import { Injectable, OnModuleInit, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Account } from "./account.entity";
import { CreateAccountDto } from "./dto/create-dto";
import { UpdateAccountDto } from "./dto/update-dto";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { CryptoService } from "src/crypto/crypto.service";
import { Role } from "src/enums/role.enum";

@Injectable()
export class AccountsService implements OnModuleInit {
    private readonly logger = new Logger(AccountsService.name);

    constructor(
        @InjectRepository(Account)
        private readonly accountsRepository: Repository<Account>,
        @InjectMapper() private readonly classMapper: Mapper,
        private readonly cryptoService: CryptoService
    ) {}

    async onModuleInit() {
        try {
            await this.accountsRepository.findOneByOrFail({ role: Role.Admin });
            this.logger.log("Database has at least one admin account");
        } catch {
            const createAccountDto: CreateAccountDto = {
                userName: process.env.ADMIN_DEFAULT_USERNAME ?? "admin",
                firstName: process.env.ADMIN_DEFAULT_FIRSTNAME ?? "",
                lastName: process.env.ADMIN_DEFAULT_LASTNAME ?? "",
                role: Role.Admin,
                password: process.env.ADMIN_DEFAULT_PASSWORD ?? "admin",
                confirmPassword: process.env.ADMIN_DEFAULT_PASSWORD ?? "admin"
            };
            const account = this.classMapper.map(createAccountDto, CreateAccountDto, Account);
            account.passwordHash = await this.cryptoService.hashPassword(createAccountDto.password);
            await this.accountsRepository.save(account);
            this.logger.log(`Default admin created with password: ${createAccountDto.password}`);
        }
    }

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
