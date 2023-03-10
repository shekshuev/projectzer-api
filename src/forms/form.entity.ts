import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";
import { Question } from "@/forms/question.model";

@Entity()
export class Form {
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number;

    @AutoMap()
    @Column({ nullable: false, unique: false })
    title: string;

    @AutoMap()
    @Column({ nullable: true })
    description: string;

    @AutoMap(() => [Question])
    @Column("jsonb", { nullable: true })
    questions: Question[];

    @AutoMap()
    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @AutoMap()
    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;
}
