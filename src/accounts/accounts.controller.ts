import {
    Controller,
    Get,
    Param,
    Query,
    Post,
    Put,
    Delete,
    Body,
    HttpException,
    HttpStatus,
    HttpCode,
    UseInterceptors,
    UseGuards
} from "@nestjs/common";
import { MapInterceptor, InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { CreateAccountDto } from "./dto/create-dto";
import { UpdateAccountDto } from "./dto/update-dto";
import { AccountsService } from "./accounts.service";
import { Account } from "./account.entity";
import { ReadAccountDto } from "./dto/read-dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/roles.guard";
import { Role } from "src/enums/role.enum";
import { Roles } from "src/decorators/roles.decorator";

interface IAccountResultList {
    total: number;
    accounts: ReadAccountDto[];
}

@Controller("accounts")
export class AccountsController {
    constructor(private accountsService: AccountsService, @InjectMapper() private readonly classMapper: Mapper) {}

    @Get()
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    public async getAll(@Query("count") count: number, @Query("offset") offset: number): Promise<IAccountResultList> {
        const [accounts, total] = await this.accountsService.findAll(count || 10, offset || 0);
        return {
            total: total,
            accounts: this.classMapper.mapArray(accounts, Account, ReadAccountDto)
        };
    }

    @Get(":id")
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(MapInterceptor(Account, ReadAccountDto))
    public async getById(@Param("id") id: number): Promise<ReadAccountDto> {
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
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
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
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
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
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
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
