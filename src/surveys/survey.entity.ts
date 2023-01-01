import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
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
    @OneToOne(() => Form)
    @JoinColumn()
    form: Form;

    @AutoMap()
    @Column({ nullable: false })
    formId: number;

    @AutoMap()
    @Column("jsonb", { nullable: true })
    area: FeatureCollection;
}
