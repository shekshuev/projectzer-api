import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    userName: string;

    @Column()
    firstName: string;

    @Column()
    middleName: string;

    @Column()
    lastName: string;

    @Column()
    role: string;

    @Column()
    passwordHash: string;
}
