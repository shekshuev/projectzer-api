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
import { CreateFormDTO } from "@/forms/dto/create.dto";
import { UpdateFormDTO } from "@/forms/dto/update.dto";
import { ReadFormDTO } from "@/forms/dto/read.dto";
import { ReadFormListDTO } from "@/forms/dto/read-list.dto";
import { FormsService } from "@/forms/forms.service";
import { Form } from "@/forms/form.entity";
import { JwtAuthGuard } from "@/auth/jwt-auth.guard";
import { RolesGuard } from "@/auth/roles.guard";
import { Role } from "@/enums/role.enum";
import { Roles } from "@/decorators/roles.decorator";
import { ApiTags, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags("forms")
@ApiBearerAuth("Bearer")
@ApiResponse({ status: 401, description: "Unauthorized (no access token provided)" })
@Controller("forms")
export class FormsController {
    constructor(private formsService: FormsService, @InjectMapper() private readonly classMapper: Mapper) {}

    @ApiResponse({
        status: 200,
        description: "Object with list of forms and their total count",
        type: ReadFormListDTO
    })
    @Get()
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    public async getAll(@Query("count") count: number, @Query("offset") offset: number): Promise<ReadFormListDTO> {
        const [surveys, total] = await this.formsService.findAll(count || 10, offset || 0);
        return {
            total: total,
            forms: this.classMapper.mapArray(surveys, Form, ReadFormDTO)
        };
    }

    @ApiResponse({
        status: 200,
        description: "Form object",
        type: ReadFormDTO
    })
    @ApiResponse({ status: 404, description: "No form with provided id" })
    @Get(":id")
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(MapInterceptor(Form, ReadFormDTO))
    public async getById(@Param("id") id: number): Promise<ReadFormDTO> {
        try {
            return await this.formsService.findOne(id);
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
        description: "Form created",
        type: ReadFormDTO
    })
    @ApiResponse({ status: 400, description: "Wrong body" })
    @Post()
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(MapInterceptor(Form, ReadFormDTO))
    public async create(@Body() createFormDTO: CreateFormDTO): Promise<ReadFormDTO> {
        try {
            return await this.formsService.create(createFormDTO);
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
        description: "Form updated",
        type: ReadFormDTO
    })
    @ApiResponse({ status: 400, description: "Wrong body" })
    @ApiResponse({ status: 404, description: "No form with provided id" })
    @Put(":id")
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UseInterceptors(MapInterceptor(Form, ReadFormDTO))
    public async update(@Param("id") id: number, @Body() updateFormDTO: UpdateFormDTO): Promise<ReadFormDTO> {
        try {
            return await this.formsService.update(id, updateFormDTO);
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

    @ApiResponse({ status: 204, description: "Form deleted" })
    @ApiResponse({ status: 404, description: "No form with provided id" })
    @Delete(":id")
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    public async delete(@Param("id") id: number): Promise<void> {
        try {
            await this.formsService.remove(id);
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
