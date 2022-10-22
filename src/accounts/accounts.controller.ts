import { Controller, Get, Param, Post, Put, Delete, Body, HttpException, HttpStatus, HttpCode } from "@nestjs/common";
import { CreateAccountDto } from "./dto/create-dto";
import { UpdateAccountDto } from "./dto/update-dto";
import { AccountsService } from "./accounts.service";
import { Account } from "./account.entity";

@Controller("accounts")
export class AccountsController {
    constructor(private accountsService: AccountsService) {}
    @Get()
    public async getAll(): Promise<Account[]> {
        return await this.accountsService.findAll();
    }

    @Get(":id")
    public async getById(@Param("id") id: number): Promise<Account> {
        try {
            return await this.accountsService.findOne(id);
        } catch (e) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: e.message
                },
                HttpStatus.NOT_FOUND
            );
        }
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    public async create(@Body() createAccountDto: CreateAccountDto): Promise<void> {
        try {
            await this.accountsService.create(createAccountDto);
        } catch (e) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    error: e.message
                },
                HttpStatus.FORBIDDEN
            );
        }
    }

    @Put(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    public async update(@Param("id") id: number, @Body() updateAccountDto: UpdateAccountDto): Promise<void> {
        try {
            await this.accountsService.update(id, updateAccountDto);
        } catch (e) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    error: e.message
                },
                HttpStatus.FORBIDDEN
            );
        }
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    public async delete(@Param("id") id: number): Promise<void> {
        try {
            await this.accountsService.remove(id);
        } catch (e) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    error: e.message
                },
                HttpStatus.FORBIDDEN
            );
        }
    }
}
