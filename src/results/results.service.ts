import { Injectable } from "@nestjs/common";
import { Result } from "@/results/result.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { CreateResultDTO } from "@/results/dto/create.dto";
import { SurveysService } from "@/surveys/surveys.service";
import { AccountsService } from "@/accounts/accounts.service";

@Injectable()
export class ResultsService {
    constructor(
        @InjectRepository(Result) private readonly resultsRepository: Repository<Result>,
        @InjectMapper() private readonly classMapper: Mapper,
        private readonly surveyService: SurveysService,
        private readonly accountService: AccountsService
    ) {}

    async findAll(count: number, offset: number): Promise<[Result[], number]> {
        return this.resultsRepository.findAndCount({
            take: count,
            skip: offset
        });
    }

    async findOne(id: number): Promise<Result> {
        return this.resultsRepository.findOneByOrFail({ id: id });
    }

    async create(createResultDTO: CreateResultDTO): Promise<Result> {
        await this.surveyService.findOne(createResultDTO.surveyId);
        await this.accountService.findOne(createResultDTO.accountId);
        const result = this.classMapper.map(createResultDTO, CreateResultDTO, Result);
        result.createdAt = new Date();
        return await this.resultsRepository.save(result);
    }

    async remove(id: number): Promise<void> {
        const result = await this.resultsRepository.findOneByOrFail({ id: id });
        await this.resultsRepository.remove(result);
    }
}
