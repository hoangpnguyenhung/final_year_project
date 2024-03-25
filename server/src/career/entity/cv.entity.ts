import { User } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Career } from "./career.entity";

@Entity()
export class Cv {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column()
    gender: string;

    @Column()
    idCard: string;

    @Column()
    dateOfBirth: string;

    @Column()
    phoneNumber: string;

    @Column()
    education: string;

    @Column()
    address: string;

    @Column()
    email: string;

    @Column()
    introduce: string;

    //New, Approve, Reject
    @Column({
        default: "New",
    })
    status: string;

    @ManyToOne(() => User, (user) => user.cvs)
    user: User

    @ManyToOne(() => Career, (career) => career.cvs)
    career: Career

    @CreateDateColumn()
    created_at: Date;
}