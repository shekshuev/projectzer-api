import { Controller, Get, Param, Post, Body } from "@nestjs/common";
import { CreateAccountDto } from "./dto/create-dto";
import { AccountsService } from "./accounts.service";
import { Account } from "./account.entity";

@Controller("accounts")
export class AccountsController {
    constructor(private accountsService: AccountsService) {}
    @Get()
    public getAll(): Promise<Account[]> {
        return this.accountsService.findAll();
    }

    @Get(":id")
    public getById(@Param("id") id: number): Promise<Account> {
        return this.accountsService.findOne(id);
    }

    @Post()
    public create(@Body() createAccountDto: CreateAccountDto): Promise<Account> {
        return this.accountsService.create(createAccountDto);
    }
}
