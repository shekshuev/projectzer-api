import { Injectable } from "@nestjs/common";
import { Survey } from "@/surveys/survey.entity";
import { FilledSurvey } from "@/surveys/survey-filled.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { CreateSurveyDTO } from "@/surveys/dto/create.dto";
import { CreateFilledSurveyDTO } from "@/surveys/dto/create-filled.dto";
import { UpdateSurveyDTO } from "@/surveys/dto/update.dto";
import { FormsService } from "@/forms/forms.service";

@Injectable()
export class SurveysService {
    constructor(
        @InjectRepository(Survey) private readonly surveyRepository: Repository<Survey>,
        @InjectRepository(FilledSurvey) private readonly filledSurveyRepository: Repository<FilledSurvey>,
        @InjectMapper() private readonly classMapper: Mapper,
        private readonly formService: FormsService
    ) {}

    async findAll(count: number, offset: number): Promise<[Survey[], number]> {
        return this.surveyRepository.findAndCount({
            take: count,
            skip: offset
        });
    }

    async findAllFilled(count: number, offset: number): Promise<[FilledSurvey[], number]> {
        return this.filledSurveyRepository.findAndCount({
            take: count,
            skip: offset
        });
    }

    async findOne(id: number): Promise<Survey> {
        return this.surveyRepository.findOneByOrFail({ id: id });
    }

    async findOneFilled(id: number): Promise<FilledSurvey> {
        return this.filledSurveyRepository.findOneByOrFail({ id: id });
    }

    async create(createSurveyDto: CreateSurveyDTO): Promise<Survey> {
        await this.formService.findOne(createSurveyDto.formId);
        const survey = this.classMapper.map(createSurveyDto, CreateSurveyDTO, Survey);
        survey.createdAt = new Date();
        return await this.surveyRepository.save(survey);
    }

    async createFilled(createFilledSurveyDTO: CreateFilledSurveyDTO): Promise<FilledSurvey> {
        const filledSurvey = this.classMapper.map(createFilledSurveyDTO, CreateFilledSurveyDTO, FilledSurvey);
        filledSurvey.createdAt = new Date();
        return await this.filledSurveyRepository.save(filledSurvey);
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

    async removeFilled(id: number): Promise<void> {
        const survey = await this.filledSurveyRepository.findOneByOrFail({ id: id });
        await this.filledSurveyRepository.remove(survey);
    }
}
