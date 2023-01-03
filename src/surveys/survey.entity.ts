import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";
import { FeatureCollection } from "@/geojson/feature-collection";
import { Form } from "@/forms/form.entity";

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

    @AutoMap()
    @Column({ nullable: false, default: 0 })
    formsCount: number;

    @AutoMap()
    @ManyToOne(() => Form)
    @JoinColumn()
    form: Form;

    @AutoMap()
    @Column({ nullable: false })
    formId: number;

    @AutoMap()
    @Column("jsonb", { nullable: true })
    area: FeatureCollection;
}
