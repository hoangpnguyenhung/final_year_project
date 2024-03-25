import { Schedule } from "src/schedule/entity/schedule.entity";
import { Seat } from "src/seat/entity/seat.entity";
import { User } from "src/user/entity/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Car {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true
    })
    name: string

    @Column()
    type: string

    @Column()
    totalRow: number

    @Column()
    totalColumn: number

    @Column()
    numberOfFloor: number

    @Column({default: true})
    isActive: boolean

    @Column()
    phoneNumber: string

    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @OneToMany(() => Seat, (seat) => seat.car)
    seats: Seat[]

    @OneToMany(() => Schedule, schedule => schedule.car)
    schedules: Schedule[]
}