import { Schedule } from "src/schedule/entity/schedule.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @Column()
    city: string

    @Column({
        default: true
    })
    isActive: boolean;

    @OneToMany(() => Schedule, schedule => schedule.departureAddress)
    scheduleDeparture: Schedule[];

    @OneToMany(() => Schedule, schedule => schedule.destinationAddress)
    scheduleDestination: Schedule[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}