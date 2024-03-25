import { Rate } from "src/rate/entity/rate.entity";
import { Schedule } from "src/schedule/entity/schedule.entity";
import { Seat } from "src/seat/entity/seat.entity";
import { User } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    totalMoney: number

    //waiting, processing, completed, cancelled
    @Column({
        default: 'waiting'
    })
    status: string

    @Column()
    fullname: string

    @Column()
    phoneNumber: string;

    @Column()
    email: string

    @Column()
    city: string;

    @Column()
    district: string;

    @ManyToOne(() => User, (user) => user.tickets)
    user: User

    @ManyToOne(() => Schedule, (schedule) => schedule.tickets)
    schedule: Schedule

    @ManyToOne(() => Seat, seat => seat.tickets)
    seat: Seat

    // @OneToMany(() => Rate, (rate) => rate.ticket)
    // rates: Rate[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}