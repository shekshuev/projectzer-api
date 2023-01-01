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
import { ReadFilledSurveyListDTO } from "@/surveys/dto/read-filled-list.dto";
import { ApiTags, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { FilledSurvey } from "@/surveys/survey-filled.entity";
import { ReadFilledSurveyDTO } from "@/surveys/dto/read-filled.dto";
import { CreateFilledSurveyDTO } from "@/surveys/dto/create-filled.dto";

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
    public async getAll(@Query("count") count: number, @Query("offset") offset: number): Promise<ReadSurveyListDTO> {
        const [surveys, total] = await this.surveysService.findAll(count || 10, offset || 0);
        return {
            total: total,
            surveys: this.classMapper.mapArray(surveys, Survey, ReadSurveyDTO)
        };
    }

    @ApiResponse({
        status: 200,
        description: "Object with list of filled surveys and their total count",
        type: ReadSurveyListDTO
    })
    @Get("/filled")
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    public async getAllFilled(
        @Query("count") count: number,
        @Query("offset") offset: number
    ): Promise<ReadFilledSurveyListDTO> {
        const [surveys, total] = await this.surveysService.findAllFilled(count || 10, offset || 0);
        return {
            total: total,
            surveys: this.classMapper.mapArray(surveys, FilledSurvey, ReadFilledSurveyDTO)
        };
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
        status: 200,
        description: "Survey object",
        type: ReadSurveyDTO
    })
    @ApiResponse({ status: 404, description: "No filled survey with provided id" })
    @Get("/filled/:id")
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(MapInterceptor(Survey, ReadFilledSurveyDTO))
    public async getFilledById(@Param("id") id: number): Promise<ReadFilledSurveyDTO> {
        try {
            return await this.surveysService.findOneFilled(id);
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
        status: 201,
        description: "Filled survey created",
        type: ReadSurveyDTO
    })
    @ApiResponse({ status: 400, description: "Wrong body" })
    @Post("/filled")
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(MapInterceptor(Survey, ReadSurveyDTO))
    public async createFilled(@Body() createFilledSurveyDTO: CreateFilledSurveyDTO): Promise<ReadFilledSurveyDTO> {
        try {
            return await this.surveysService.createFilled(createFilledSurveyDTO);
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

    @ApiResponse({ status: 204, description: "Filled survey deleted" })
    @ApiResponse({ status: 404, description: "No filled survey with provided id" })
    @Delete("filled/:id")
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    public async deleteFilled(@Param("id") id: number): Promise<void> {
        try {
            await this.surveysService.removeFilled(id);
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
