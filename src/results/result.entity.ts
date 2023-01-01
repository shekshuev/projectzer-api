import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";
import { Survey } from "@/surveys/survey.entity";
import { Feature } from "@/geojson/feature";
import { ResultQuestion } from "@/results/result-question.model";

@Entity()
export class Result {
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number;

    @AutoMap()
    @OneToOne(() => Survey)
    @JoinColumn()
    survey: Survey;

    @AutoMap()
    @Column({ nullable: false })
    surveyId: number;

    @Column({ nullable: false })
    createdAt: Date;

    @AutoMap()
    @Column({ nullable: false })
    beginDate: Date;

    @AutoMap()
    @Column({ nullable: false })
    endDate: Date;

    @AutoMap()
    @Column("jsonb", { nullable: false })
    point: Feature;

    @AutoMap()
    @Column({ nullable: false })
    completed: boolean;

    @AutoMap(() => [ResultQuestion])
    @Column("jsonb", { nullable: false })
    questions: ResultQuestion[];
}
