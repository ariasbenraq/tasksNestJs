// Importamos herramientas de NestJS y tipos necesarios
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { TaskStatus } from './task-status.enum';

// Decorador que permite que esta clase sea inyectada como servicio
@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ) { }

    // // Este método devuelve todas las tareas almacenadas
    async getAllTasks(): Promise<Task[]> {
        return this.taskRepository.find({
            where: { isDeleted: false } // Solo tareas no eliminadas
        });  // Devuelve el array completo de tareas
    }

    // getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
    //     const { status, search } = filterDto;  // Extrae los filtros del DTO

    //     let tasks = this.getAllTasks();  // Obtiene todas las tareas

    //     if (status) {
    //         tasks = tasks.filter(task => task.status === status);  // Filtra por estado
    //     }

    //     if (search) {
    //         tasks = tasks.filter(task =>
    //             task.title.includes(search) || task.description.includes(search),
    //         );  // Filtra por búsqueda en título o descripción
    //     }

    //     return tasks;
    // }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne({
            where: { id },  // 👈 ahora se pasa como objeto
        });

        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);  // Lanza una excepción si no la encuentra
        }

        return found;
    }


    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;  // Extrae los campos del DTO

        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        // task.delete = false;
        await task.save(); // Guarda la tarea en la base de datos

        return task;
    }


    // updateTaskStatus(id: string, status: TaskStatus): Task | undefined {
    //     // Busca la tarea por ID
    //     const task = this.getTaskById(id);
    //     if (task) {
    //         task.status = status;  // Actualiza el estado de la tarea
    //     }
    //     return task;  // Devuelve la tarea actualizada o undefined
    // }

    async deleteTask(id: number): Promise<void> {
       const task =  await this.getTaskById(id);
       task.isDeleted = true;
       await task.save(); 
    }
}
