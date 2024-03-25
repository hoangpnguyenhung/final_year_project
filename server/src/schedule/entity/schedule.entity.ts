import { Address } from "src/address/entity/address.entity";
import { Ticket } from "src/ticket/entity/ticket.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Car } from "src/car/entity/car.entity";

@Entity()
export class Schedule {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number

    @Column()
    startTime: string

    @Column()
    endTime: string

    @Column()
    startDay: Date

    @Column()
    endDay: Date

    @Column()
    distance: string

    @Column({default: "waiting"})
    status: string

    @Column({default: true})
    isActive: boolean

    @OneToMany(() => Ticket, (ticket) => ticket.schedule)
    tickets: Ticket[]

    @ManyToOne(() => Car, car => car.schedules)
    car: Car

    @ManyToOne(() => Address, address => address.scheduleDeparture)
    departureAddress: Address;

    @ManyToOne(() => Address, address => address.scheduleDestination)
    destinationAddress: Address;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}