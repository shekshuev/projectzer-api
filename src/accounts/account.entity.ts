import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";

@Entity()
export class Account {
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number;

    @AutoMap()
    @Column({ unique: true })
    userName: string;

    @AutoMap()
    @Column({ nullable: true })
    firstName: string;

    @AutoMap()
    @Column({ nullable: true })
    lastName: string;

    @AutoMap()
    @Column()
    role: string;

    @Column()
    passwordHash: string;
}
