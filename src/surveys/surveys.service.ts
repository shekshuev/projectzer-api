import { Injectable } from "@nestjs/common";
import { Survey } from "@/surveys/survey.entity";
import { Repository, ILike } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { CreateSurveyDTO } from "@/surveys/dto/create.dto";
import { UpdateSurveyDTO } from "@/surveys/dto/update.dto";
import { FilterSurveyDTO } from "@/surveys/dto/filter.dto";
import { FormsService } from "@/forms/forms.service";
import * as turf from "@turf/turf";

@Injectable()
export class SurveysService {
    constructor(
        @InjectRepository(Survey) private readonly surveyRepository: Repository<Survey>,
        @InjectMapper() private readonly classMapper: Mapper,
        private readonly formService: FormsService
    ) {}

    async findAll(count: number, offset: number, filterDTO?: FilterSurveyDTO): Promise<[Survey[], number]> {
        if (filterDTO) {
            const filter = {};
            const { latitude, longitude, ...rest } = filterDTO;
            for (const prop in rest) {
                if (!!filterDTO[prop]) {
                    if (["id"].includes(prop) && filterDTO[prop]) {
                        Reflect.set(filter, prop, filterDTO[prop]);
                    } else if (["title", "description"].includes(prop)) {
                        Reflect.set(filter, prop, ILike(`${filterDTO[prop]}%`));
                    }
                }
            }
            let [surveys, total] = await this.surveyRepository
                .createQueryBuilder()
                .where(filter)
                .take(count)
                .skip(offset)
                .getManyAndCount();
            if (!isNaN(latitude) && !isNaN(longitude)) {
                surveys = surveys?.filter(survey => {
                    const point = turf.point([longitude, latitude]);
                    for (const feature of survey.area.features) {
                        const polygon = turf.polygon(feature.geometry.coordinates);
                        if (turf.booleanPointInPolygon(point, polygon)) {
                            return true;
                        }
                    }
                    total--;
                    return false;
                });
            }
            return [surveys, total];
        } else {
            return this.surveyRepository.findAndCount({
                take: count,
                skip: offset
            });
        }
    }

    async findOne(id: number): Promise<Survey> {
        return this.surveyRepository.findOneByOrFail({ id: id });
    }

    async create(createSurveyDto: CreateSurveyDTO): Promise<Survey> {
        await this.formService.findOne(createSurveyDto.formId);
        const survey = this.classMapper.map(createSurveyDto, CreateSurveyDTO, Survey);
        survey.createdAt = new Date();
        return await this.surveyRepository.save(survey);
    }

    async update(id: number, updateSurveyDTO: UpdateSurveyDTO): Promise<Survey> {
        if (updateSurveyDTO.formId) {
            await this.formService.findOne(updateSurveyDTO.formId);
        }
        const survey = await this.surveyRepository.findOneByOrFail({ id: id });
        for (const prop in updateSurveyDTO) {
            if (survey.hasOwnProperty(prop) && !!updateSurveyDTO[prop]) {
                survey[prop] = updateSurveyDTO[prop];
            }
        }
        return await this.surveyRepository.save(survey);
    }

    async remove(id: number): Promise<void> {
        const survey = await this.surveyRepository.findOneByOrFail({ id: id });
        await this.surveyRepository.remove(survey);
    }
}
