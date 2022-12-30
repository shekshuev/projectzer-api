import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";
import { FeatureCollection, Polygon } from "geojson";

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
    @Column("jsonb", { nullable: true })
    content: any;

    @AutoMap()
    @Column("jsonb", { nullable: true })
    area: FeatureCollection<Polygon>;
}
