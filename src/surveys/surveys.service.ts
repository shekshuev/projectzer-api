import { Injectable } from "@nestjs/common";
import { Survey } from "./survey.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { CreateSurveyDTO } from "./dto/create-dto";

@Injectable()
export class SurveysService {
    constructor(
        @InjectRepository(Survey) private readonly surveyRepository: Repository<Survey>,
        @InjectMapper() private readonly classMapper: Mapper
    ) {}

    async findAll(count: number, offset: number): Promise<[Survey[], number]> {
        return this.surveyRepository.findAndCount({
            take: count,
            skip: offset
        });
    }

    async findOne(id: number): Promise<Survey> {
        return this.surveyRepository.findOneByOrFail({ id: id });
    }

    async create(createSurveyDto: CreateSurveyDTO): Promise<void> {
        const survey = this.classMapper.map(createSurveyDto, CreateSurveyDTO, Survey);
        survey.createdAt = new Date();
        await this.surveyRepository.save(survey);
    }

    async remove(id: number): Promise<void> {
        const survey = await this.surveyRepository.findOneByOrFail({ id: id });
        await this.surveyRepository.remove(survey);
    }
}
