import { Ticket } from "src/ticket/entity/ticket.entity";
import { User } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rate {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @ManyToOne(() => User, (user) => user.rates)
    user: User

    @OneToOne(() => Ticket)
    @JoinColumn()
    ticket: Ticket

    @CreateDateColumn()
    created_at: Date;
}