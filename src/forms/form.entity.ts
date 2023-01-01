import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";
import { Question } from "@/forms/question.model";

@Entity()
export class Form {
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    createdAt: Date;

    @AutoMap()
    @Column({ nullable: false, unique: false })
    title: string;

    @AutoMap()
    @Column({ nullable: true })
    description: string;

    @AutoMap(() => [Question])
    @Column("jsonb", { nullable: true })
    questions: Question[];
}
