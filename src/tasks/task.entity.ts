import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";

@Entity() // Decorador que indica que esta clase es una entidad de la base de datos
export class Task extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column() 
    status: TaskStatus;

    @Column({ type: 'boolean', default: false, nullable: false })
    isDeleted: boolean;
    // El decorador @Column() indica que este campo es una columna en la base de datos
    // El tipo TaskStatus es un enum que define los estados posibles de una tarea
    // Los valores de este enum son OPEN, IN_PROGRESS y DONE
    // Esto permite que el campo status almacene solo estos valores específicos
}