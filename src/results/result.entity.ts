import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import { AutoMap } from "@automapper/classes";
import { Survey } from "@/surveys/survey.entity";
import { Feature } from "@/geojson/feature";
import { ResultQuestion } from "@/results/result-question.model";
import { Account } from "@/accounts/account.entity";

@Entity()
export class Result {
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number;

    @AutoMap()
    @ManyToOne(() => Survey)
    @JoinColumn()
    survey: Survey;

    @AutoMap()
    @Column({ nullable: false })
    surveyId: number;

    @AutoMap()
    @ManyToOne(() => Account, account => account.results)
    @JoinColumn()
    account: Account;

    @AutoMap()
    @Column({ nullable: false })
    accountId: number;

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

    @AutoMap()
    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @AutoMap()
    @UpdateDateColumn({ type: "timestamp" })
    updatedAt: Date;
}
