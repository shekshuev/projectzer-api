import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";
import { FeatureCollection } from "@/geojson/feature-collection";
import { Question } from "@/surveys/question.model";

@Entity()
export class Survey {
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    createdAt: Date;

    @AutoMap()
    @Column({ nullable: false })
    beginDate: Date;

    @AutoMap()
    @Column({ nullable: false })
    endDate: Date;

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
    @Column("jsonb", { nullable: true })
    area: FeatureCollection;
}
