import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Account } from "./account.entity";
import { CreateAccountDto } from "./dto/create-dto";
import { UpdateAccountDto } from "./dto/update-dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(Account)
        private readonly accountsRepository: Repository<Account>
    ) {}

    async findAll(): Promise<Account[]> {
        return this.accountsRepository.find();
    }

    async findOne(id: number): Promise<Account> {
        return this.accountsRepository.findOneByOrFail({ id: id });
    }

    async create(createAccountDto: CreateAccountDto): Promise<Account> {
        if (createAccountDto.password !== createAccountDto.confirmPassword) {
            throw Error("Passwords doesn't match!");
        } else if (!["admin", "interviewer"].includes(createAccountDto.role)) {
            throw Error("Wrong account role!");
        } else {
            const account = new Account();
            account.userName = createAccountDto.userName;
            account.firstName = createAccountDto.firstName;
            account.middleName = createAccountDto.middleName;
            account.lastName = createAccountDto.lastName;
            account.role = createAccountDto.role;
            account.passwordHash = await bcrypt.hash(createAccountDto.password, 10);
            return await this.accountsRepository.save(account);
        }
    }

    async update(id: number, updateAccountDto: UpdateAccountDto): Promise<Account> {
        if (updateAccountDto.password !== updateAccountDto.confirmPassword) {
            throw Error("Passwords doesn't match!");
        } else if (updateAccountDto.role && !["admin", "interviewer"].includes(updateAccountDto.role)) {
            throw Error("Wrong account role!");
        } else {
            const account = await this.accountsRepository.findOneByOrFail({ id: id });
            for (const prop in updateAccountDto) {
                if (account.hasOwnProperty(prop) && !!updateAccountDto[prop]) {
                    if (prop === "password") {
                        account.passwordHash = await bcrypt.hash(updateAccountDto.password, 10);
                    } else if (prop === "confirmPassword") {
                        continue;
                    } else {
                        account[prop] = updateAccountDto[prop];
                    }
                }
            }
            return await this.accountsRepository.save(account);
        }
    }

    async remove(id: number): Promise<void> {
        const account = await this.accountsRepository.findOneByOrFail({ id: id });
        await this.accountsRepository.remove(account);
    }
}
