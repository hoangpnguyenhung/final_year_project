import { Column, CreateDateColumn, Entity, IsNull, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        default: 1
    })
    code: string

    @OneToMany(() => User, (users) => users.role)
    users: User[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}