import { Car } from "src/car/entity/car.entity";
import { Ticket } from "src/ticket/entity/ticket.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Seat {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    //available, booked, disable
    @Column({
        default: 'available'
    })
    status: string

    @OneToMany(() => Ticket, ticket => ticket.seat)
    tickets: Ticket[]

    @ManyToOne(() => Car, (car) => car.seats)
    car: Car

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}