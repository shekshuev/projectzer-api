import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";
import { Survey } from "@/surveys/survey.entity";
import { Feature } from "@/geojson/feature";
import { FilledQuestion } from "@/surveys/filled-question.model";

@Entity()
export class FilledSurvey {
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

    @AutoMap(() => [FilledQuestion])
    @Column("jsonb", { nullable: false })
    questions: FilledQuestion[];
}
