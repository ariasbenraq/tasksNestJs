import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Task } from "../tasks/task.entity";

@Entity('users')
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;

    @Column()
    password: string;
    // Otros campos relevantes para el usuario

    @OneToMany(type => Task, task => task.user, { eager: true })
    tasks: Task[];

    async validatePassword(plain: string): Promise<boolean> {
        return bcrypt.compare(plain, this.password);
        
    }
}