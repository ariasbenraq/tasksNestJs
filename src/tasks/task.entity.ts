import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./tasks.model";

export class Task extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;
    // El decorador @Column() indica que este campo es una columna en la base de datos
    // El tipo TaskStatus es un enum que define los estados posibles de una tarea
    // Los valores de este enum son OPEN, IN_PROGRESS y DONE
    // Esto permite que el campo status almacene solo estos valores específicos
}