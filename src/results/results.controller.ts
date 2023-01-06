import {
    Controller,
    Get,
    Param,
    Query,
    Post,
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
import { CreateResultDTO } from "@/results/dto/create.dto";
import { ReadResultDTO } from "@/results/dto/read.dto";
import { ReadResultListDTO } from "@/results/dto/read-list.dto";
import { ReadPersonalResultDTO } from "@/results/dto/read-personal.dto";
import { ReadPersonalResultListDTO } from "@/results/dto/read-personal-list.dto";
import { ResultsService } from "@/results/results.service";
import { Result } from "@/results/result.entity";
import { JwtAuthGuard } from "@/auth/jwt-auth.guard";
import { RolesGuard } from "@/auth/roles.guard";
import { Role } from "@/enums/role.enum";
import { Roles } from "@/decorators/roles.decorator";
import { ApiTags, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags("results")
@ApiBearerAuth("Bearer")
@ApiResponse({ status: 401, description: "Unauthorized (no access token provided)" })
@Controller("results")
export class ResultsController {
    constructor(private resultsService: ResultsService, @InjectMapper() private readonly classMapper: Mapper) {}

    @ApiResponse({
        status: 200,
        description: "Object with list of results and their total count",
        type: ReadResultListDTO
    })
    @Get()
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    public async getAll(
        @Query("count") count: number,
        @Query("offset") offset: number,
        @Query("id") id?: number,
        @Query("surveyId") surveyId?: number,
        @Query("accountId") accountId?: number,
        @Query("beginDate") beginDate?: string,
        @Query("endDate") endDate?: string
    ): Promise<ReadResultListDTO> {
        const filterDTO = {
            id,
            surveyId,
            accountId,
            beginDate,
            endDate
        };
        const [surveys, total] = await this.resultsService.findAll(count || 10, offset || 0, filterDTO);
        return {
            total: total,
            results: this.classMapper.mapArray(surveys, Result, ReadResultDTO)
        };
    }

    @ApiResponse({
        status: 200,
        description: "Object with list of results for current account and their total count",
        type: ReadResultListDTO
    })
    @Get("/account")
    @Roles(Role.Interviewer)
    @UseGuards(JwtAuthGuard, RolesGuard)
    public async getAllForAccount(@Request() request: any): Promise<ReadPersonalResultListDTO> {
        const filterDTO = {
            id: null,
            surveyId: null,
            accountId: request?.user?.id,
            beginDate: null,
            endDate: null
        };
        const [surveys, total] = await this.resultsService.findAll(-1, -1, filterDTO);
        return {
            total: total,
            results: this.classMapper.mapArray(surveys, Result, ReadPersonalResultDTO)
        };
    }

    @ApiResponse({
        status: 200,
        description: "Result object",
        type: ReadResultDTO
    })
    @ApiResponse({ status: 404, description: "No result with provided id" })
    @Get(":id")
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(MapInterceptor(Result, ReadResultDTO))
    public async getById(@Param("id") id: number): Promise<ReadResultDTO> {
        try {
            return await this.resultsService.findOne(id);
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
        description: "Result created",
        type: ReadResultDTO
    })
    @ApiResponse({ status: 400, description: "Wrong body" })
    @Post()
    @Roles(Role.Interviewer)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(MapInterceptor(Result, ReadResultDTO))
    public async create(@Body() createResultDTO: CreateResultDTO, @Request() request: any): Promise<ReadResultDTO> {
        try {
            createResultDTO.accountId = request?.user?.id;
            return await this.resultsService.create(createResultDTO);
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

    @ApiResponse({ status: 204, description: "Result deleted" })
    @ApiResponse({ status: 404, description: "No result with provided id" })
    @Delete(":id")
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    public async delete(@Param("id") id: number): Promise<void> {
        try {
            await this.resultsService.remove(id);
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
