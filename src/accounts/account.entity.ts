import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    userName: string;

    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true })
    middleName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column()
    role: string;

    @Column()
    passwordHash: string;
}
