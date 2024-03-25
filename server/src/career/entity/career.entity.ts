import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Cv } from "./cv.entity";

@Entity()
export class Career {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @Column()
    level: string;

    @Column()
    quantity: number;

    @Column()
    formality: string;

    @Column()
    experience: string;

    @Column()
    salary: string;

    @Column()
    workspace: string;

    @Column()
    deadline: Date;

    @Column()
    welfare: string;

    @Column()
    description: string;

    @Column()
    requirement: string;

    @Column()
    contact: string;

    @Column()
    include: string;

    @Column({
        default: true,
    })
    isActive: boolean;

    @OneToMany(() => Cv, (cv) => cv.career)
    cvs: Cv[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date
}