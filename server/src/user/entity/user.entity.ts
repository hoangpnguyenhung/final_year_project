import { Cv } from "src/career/entity/cv.entity";
import { Rate } from "src/rate/entity/rate.entity";
import { Ticket } from "src/ticket/entity/ticket.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "./role.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        unique: true
    })
    username: string;

    @Column()
    password: string;

    @Column()
    idCard: string;

    @Column()
    phoneNumber: string;

    @Column({
        unique: true
    })
    email: string;

    @Column({
        default: false
    })
    isActive: boolean;

    @Column() 
    city: string;

    @Column()
    district: string;

    @ManyToOne(() => Role, (role) => role.users)
    role: Role;

    @OneToMany(() => Cv, (cv) => cv.user)
    cvs: Cv[]

    @OneToMany(() => Ticket, (ticket) => ticket.user)
    tickets: Ticket[]

    @OneToMany(() => Rate, (rate) => rate.user)
    rates: Rate

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}