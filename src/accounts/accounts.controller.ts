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
    UseGuards,
    Request
} from "@nestjs/common";
import { MapInterceptor, InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { CreateAccountDTO } from "@/accounts/dto/create.dto";
import { UpdateAccountDTO } from "@/accounts/dto/update.dto";
import { AccountsService } from "@/accounts/accounts.service";
import { Account } from "@/accounts/account.entity";
import { ReadAccountDTO } from "@/accounts/dto/read.dto";
import { ReadAccountListDTO } from "@/accounts/dto/read-list.dto";
import { JwtAuthGuard } from "@/auth/jwt-auth.guard";
import { RolesGuard } from "@/auth/roles.guard";
import { Role } from "@/enums/role.enum";
import { Roles } from "@/decorators/roles.decorator";
import { ApiTags, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags("accounts")
@ApiBearerAuth("Bearer")
@ApiResponse({ status: 401, description: "Unauthorized (no access token provided)" })
@Controller("accounts")
export class AccountsController {
    constructor(private accountsService: AccountsService, @InjectMapper() private readonly classMapper: Mapper) {}

    @ApiResponse({
        status: 200,
        description: "Object with list of accounts and accounts total count",
        type: ReadAccountListDTO
    })
    @Get()
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    public async getAll(@Query("count") count: number, @Query("offset") offset: number): Promise<ReadAccountListDTO> {
        const [accounts, total] = await this.accountsService.findAll(count || 10, offset || 0);
        return {
            total: total,
            accounts: this.classMapper.mapArray(accounts, Account, ReadAccountDTO)
        };
    }

    @ApiResponse({
        status: 200,
        description: "Account object",
        type: ReadAccountDTO
    })
    @Get("/self")
    @Roles(Role.Interviewer)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(MapInterceptor(Account, ReadAccountDTO))
    public async getSelfInfo(@Request() request: any): Promise<ReadAccountDTO> {
        try {
            return await this.accountsService.findOne(request?.user?.id);
        } catch (e) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: e.message
                },
                HttpStatus.BAD_REQUEST
            );
        }
    }

    @ApiResponse({
        status: 200,
        description: "Account object",
        type: ReadAccountDTO
    })
    @ApiResponse({ status: 404, description: "No account with provided id" })
    @Get(":id")
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(MapInterceptor(Account, ReadAccountDTO))
    public async getById(@Param("id") id: number): Promise<ReadAccountDTO> {
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

    @ApiResponse({
        status: 201,
        description: "Account created",
        type: ReadAccountDTO
    })
    @ApiResponse({ status: 400, description: "Wrong body" })
    @Post()
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(MapInterceptor(Account, ReadAccountDTO))
    public async create(@Body() createAccountDTO: CreateAccountDTO): Promise<ReadAccountDTO> {
        try {
            return await this.accountsService.create(createAccountDTO);
        } catch (e) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: e.message
                },
                HttpStatus.BAD_REQUEST
            );
        }
    }

    @ApiResponse({
        status: 200,
        description: "Account updated",
        type: ReadAccountDTO
    })
    @ApiResponse({ status: 400, description: "Wrong body" })
    @ApiResponse({ status: 404, description: "No account with provided id" })
    @Put(":id")
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    public async update(
        @Param("id") id: number,
        @Body() updateAccountDTO: UpdateAccountDTO
    ): Promise<UpdateAccountDTO> {
        try {
            return await this.accountsService.update(id, updateAccountDTO);
        } catch (e) {
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: e.message
                },
                HttpStatus.BAD_REQUEST
            );
        }
    }

    @ApiResponse({ status: 204, description: "Account deleted" })
    @ApiResponse({ status: 404, description: "No account with provided id" })
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
                    status: HttpStatus.BAD_REQUEST,
                    error: e.message
                },
                HttpStatus.BAD_REQUEST
            );
        }
    }
}
