import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { AutoMap } from "@automapper/classes";
import { Result } from "@/results/result.entity";
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

    @OneToMany(() => Result, result => result.account)
    results: Result[];
}
