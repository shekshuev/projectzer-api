import { Injectable } from "@nestjs/common";
import { Form } from "@/forms/form.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { CreateFormDTO } from "@/forms/dto/create.dto";
import { UpdateFormDTO } from "@/forms/dto/update.dto";

@Injectable()
export class FormsService {
    constructor(
        @InjectRepository(Form) private readonly formsRepository: Repository<Form>,
        @InjectMapper() private readonly classMapper: Mapper
    ) {}

    async findAll(count: number, offset: number): Promise<[Form[], number]> {
        return this.formsRepository.findAndCount({
            take: count,
            skip: offset
        });
    }

    async findOne(id: number): Promise<Form> {
        return this.formsRepository.findOneByOrFail({ id: id });
    }

    async create(createFormDTO: CreateFormDTO): Promise<Form> {
        return await this.formsRepository.save(this.classMapper.map(createFormDTO, CreateFormDTO, Form));
    }

    async update(id: number, updateFormDTO: UpdateFormDTO): Promise<Form> {
        const form = await this.formsRepository.findOneByOrFail({ id: id });
        for (const prop in updateFormDTO) {
            if (form.hasOwnProperty(prop) && !!updateFormDTO[prop]) {
                form[prop] = updateFormDTO[prop];
            }
        }
        return await this.formsRepository.save(form);
    }

    async remove(id: number): Promise<void> {
        const form = await this.formsRepository.findOneByOrFail({ id: id });
        await this.formsRepository.remove(form);
    }
}
