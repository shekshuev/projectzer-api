import { Injectable } from "@nestjs/common";
import { Result } from "@/results/result.entity";
import { Repository, MoreThan, LessThan } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { CreateResultDTO } from "@/results/dto/create.dto";
import { SurveysService } from "@/surveys/surveys.service";
import { AccountsService } from "@/accounts/accounts.service";
import { FilterResultDTO } from "@/results/dto/filter.dto";

@Injectable()
export class ResultsService {
    constructor(
        @InjectRepository(Result) private readonly resultsRepository: Repository<Result>,
        @InjectMapper() private readonly classMapper: Mapper,
        private readonly surveyService: SurveysService,
        private readonly accountService: AccountsService
    ) {}

    async findAll(count: number, offset: number, filterDTO?: FilterResultDTO): Promise<[Result[], number]> {
        if (filterDTO) {
            const filter = {};
            for (const prop in filterDTO) {
                if (!!filterDTO[prop] || typeof filterDTO[prop] === "boolean") {
                    if (["id", "surveyId", "accountId"].includes(prop)) {
                        Reflect.set(filter, prop, filterDTO[prop]);
                    } else if (prop === "beginDate") {
                        Reflect.set(filter, prop, MoreThan(filterDTO[prop]));
                    } else if (prop === "endDate") {
                        Reflect.set(filter, prop, LessThan(filterDTO[prop]));
                    }
                }
            }
            let builder = this.resultsRepository
                .createQueryBuilder("result")
                .leftJoinAndSelect("result.survey", "survey")
                .leftJoinAndSelect("survey.form", "form")
                .where(filter);
            if (count > 0) {
                builder = builder.take(count);
            }
            if (offset > 0) {
                builder = builder.skip(offset);
            }
            return await builder.getManyAndCount();
        } else {
            return this.resultsRepository.findAndCount({
                take: count,
                skip: offset
            });
        }
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
