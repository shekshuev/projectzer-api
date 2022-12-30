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
import { CreateSurveyDTO } from "@/surveys/dto/create-dto";
import { SurveysService } from "@/surveys/surveys.service";
import { Survey } from "@/surveys/survey.entity";
import { JwtAuthGuard } from "@/auth/jwt-auth.guard";
import { RolesGuard } from "@/auth/roles.guard";
import { Role } from "@/enums/role.enum";
import { Roles } from "@/decorators/roles.decorator";
import { ReadSurveyDTO } from "@/surveys/dto/read-dto";
import { ApiTags } from "@nestjs/swagger";

interface ISurveyResultList {
    total: number;
    surveys: ReadSurveyDTO[];
}

@ApiTags("surveys")
@Controller("surveys")
export class SurveysController {
    constructor(private surveysService: SurveysService, @InjectMapper() private readonly classMapper: Mapper) {}

    @Get()
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    public async getAll(@Query("count") count: number, @Query("offset") offset: number): Promise<ISurveyResultList> {
        const [surveys, total] = await this.surveysService.findAll(count || 10, offset || 0);
        return {
            total: total,
            surveys: this.classMapper.mapArray(surveys, Survey, ReadSurveyDTO)
        };
    }

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

    @Post()
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @HttpCode(HttpStatus.CREATED)
    public async create(@Body() createSurveyDTO: CreateSurveyDTO): Promise<void> {
        try {
            await this.surveysService.create(createSurveyDTO);
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
    public async update(@Param("id") id: number, @Body() createSurveyDTO: CreateSurveyDTO): Promise<void> {
        try {
            await this.surveysService.update(id, createSurveyDTO);
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
            await this.surveysService.remove(id);
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
