import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Account } from "./account.entity";
import { CreateAccountDto } from "./dto/create-dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AccountsService {
    constructor(
        @InjectRepository(Account)
        private readonly accountsRepository: Repository<Account>
    ) {}

    async create(createAccountDto: CreateAccountDto): Promise<Account> {
        if (createAccountDto.password !== createAccountDto.confirmPassword) {
            throw Error("Passwords doesn't match!");
        } else if (!["admin", "interviewer"].includes(createAccountDto.role)) {
            throw Error("Wrong account role!");
        } else {
            const user = new Account();
            user.userName = createAccountDto.userName;
            user.firstName = createAccountDto.firstName;
            user.middleName = createAccountDto.middleName;
            user.lastName = createAccountDto.lastName;
            user.role = createAccountDto.role;
            user.passwordHash = await bcrypt.hash(createAccountDto.password, 10);
            return this.accountsRepository.save(user);
        }
    }

    async findAll(): Promise<Account[]> {
        return this.accountsRepository.find();
    }

    findOne(id: number): Promise<Account> {
        return this.accountsRepository.findOneByOrFail({ id: id });
    }

    async remove(id: string): Promise<void> {
        await this.accountsRepository.delete(id);
    }
}
