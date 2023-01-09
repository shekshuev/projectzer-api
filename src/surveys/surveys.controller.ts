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
    StreamableFile
} from "@nestjs/common";
import { MapInterceptor, InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { CreateSurveyDTO } from "@/surveys/dto/create.dto";
import { UpdateSurveyDTO } from "@/surveys/dto/update.dto";
import { SurveysService } from "@/surveys/surveys.service";
import { Survey } from "@/surveys/survey.entity";
import { JwtAuthGuard } from "@/auth/jwt-auth.guard";
import { RolesGuard } from "@/auth/roles.guard";
import { Role } from "@/enums/role.enum";
import { Roles } from "@/decorators/roles.decorator";
import { ReadSurveyDTO } from "@/surveys/dto/read.dto";
import { ReadSurveyListDTO } from "@/surveys/dto/read-list.dto";
import { ReadAvailableSurveyDTO } from "@/surveys/dto/read-available.dto";
import { ReadAvailableSurveyListDTO } from "./dto/read-list-available.dto";
import { ApiTags, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { Buffer } from "buffer";
import * as moment from "moment";

@ApiTags("surveys")
@ApiBearerAuth("Bearer")
@ApiResponse({ status: 401, description: "Unauthorized (no access token provided)" })
@Controller("surveys")
export class SurveysController {
    constructor(private surveysService: SurveysService, @InjectMapper() private readonly classMapper: Mapper) {}

    @ApiResponse({
        status: 200,
        description: "Object with list of surveys and their total count",
        type: ReadSurveyListDTO
    })
    @Get()
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    public async getAll(
        @Query("count") count: number,
        @Query("offset") offset: number,
        @Query("id") id: number,
        @Query("title") title: string,
        @Query("description") description: string,
        @Query("longitude") longitude: number,
        @Query("latitude") latitude: number
    ): Promise<ReadSurveyListDTO> {
        const filterDTO = {
            id,
            title,
            description,
            latitude,
            longitude
        };
        const [surveys, total] = await this.surveysService.findAll(count || 10, offset || 0, filterDTO);
        return {
            total: total,
            surveys: this.classMapper.mapArray(surveys, Survey, ReadSurveyDTO)
        };
    }

    @ApiResponse({
        status: 200,
        description: "Object with list of available surveys and their total count for interviewer",
        type: ReadSurveyListDTO
    })
    @Get("/available")
    @Roles(Role.Interviewer)
    @UseGuards(JwtAuthGuard, RolesGuard)
    public async getAvailable(
        @Query("longitude") longitude: number,
        @Query("latitude") latitude: number
    ): Promise<ReadAvailableSurveyListDTO> {
        const filterDTO = {
            id: null,
            title: null,
            description: null,
            latitude,
            longitude,
            available: true
        };
        const [surveys, total] = await this.surveysService.findAll(-1, -1, filterDTO);
        return {
            total: total,
            surveys: this.classMapper.mapArray(surveys, Survey, ReadAvailableSurveyDTO)
        };
    }

    @ApiResponse({
        status: 200,
        description: "JSON file with list of surveys",
        type: ReadSurveyDTO
    })
    @Get("/export")
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    public async exportFileById(
        @Query("id") id: number,
        @Query("title") title: string,
        @Query("description") description: string,
        @Query("longitude") longitude: number,
        @Query("latitude") latitude: number
    ): Promise<StreamableFile> {
        const filterDTO = {
            id,
            title,
            description,
            latitude,
            longitude
        };
        const [surveys, total] = await this.surveysService.findAll(-1, -1, filterDTO);
        const buffer = Buffer.from(
            JSON.stringify({
                total: total,
                surveys: this.classMapper.mapArray(surveys, Survey, ReadAvailableSurveyDTO)
            }),
            "utf8"
        );
        return new StreamableFile(buffer, {
            disposition: `attachment; filename="export-${moment().format("DD-MM-YYYY-HH-mm-ss")}.json`
        });
    }

    @ApiResponse({
        status: 200,
        description: "Survey object",
        type: ReadSurveyDTO
    })
    @ApiResponse({ status: 404, description: "No survey with provided id" })
    @Get(":id")
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(MapInterceptor(Survey, ReadSurveyDTO))
    public async getById(@Param("id") id: number): Promise<ReadSurveyDTO> {
        try {
            return await this.surveysService.findOne(id);
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
        description: "Survey created",
        type: ReadSurveyDTO
    })
    @ApiResponse({ status: 400, description: "Wrong body" })
    @Post()
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(MapInterceptor(Survey, ReadSurveyDTO))
    public async create(@Body() createSurveyDTO: CreateSurveyDTO): Promise<ReadSurveyDTO> {
        try {
            return await this.surveysService.create(createSurveyDTO);
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
        description: "Survey updated",
        type: ReadSurveyDTO
    })
    @ApiResponse({ status: 400, description: "Wrong body" })
    @ApiResponse({ status: 404, description: "No survey with provided id" })
    @Put(":id")
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(MapInterceptor(Survey, ReadSurveyDTO))
    public async update(@Param("id") id: number, @Body() updateSurveyDTO: UpdateSurveyDTO): Promise<ReadSurveyDTO> {
        try {
            return await this.surveysService.update(id, updateSurveyDTO);
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

    @ApiResponse({ status: 204, description: "Survey deleted" })
    @ApiResponse({ status: 404, description: "No survey with provided id" })
    @Delete(":id")
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    public async delete(@Param("id") id: number): Promise<void> {
        try {
            await this.surveysService.remove(id);
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
