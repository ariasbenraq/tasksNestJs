// Importamos herramientas de NestJS y tipos necesarios
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';

// Decorador que permite que esta clase sea inyectada como servicio
@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(Task)
		private readonly taskRepository: Repository<Task>,
	) { }

	async getTasks(
		filterDto: GetTaskFilterDto,
		user: User,
	): Promise<Task[]> {
		const { status, search } = filterDto;  // Extrae los filtros del DTO
		const query = this.taskRepository.createQueryBuilder('task');

		query.where('task.userId = :userId', { userId: user.id });
		query.andWhere('task.isDeleted = :isDeleted', { isDeleted: false });

		if (status) {
			query.andWhere('task.status = :status', { status });
		}
		if (search) {
			query.andWhere(
				'(task.title LIKE :search OR task.description LIKE :search)',
				{ search: `%${search}%` },
			);
		}

		const tasks = await query.getMany();
		return tasks;
	}

	// // Este método devuelve todas las tareas almacenadas
	// async getAllTasks(
	//     user: User): Promise<Task[]> {
	//     return this.taskRepository.find({
	//         where: { isDeleted: false, user: { id: user.id } } // Solo tareas no eliminadas del usuario
	//     });  // Devuelve el array completo de tareas
	// }

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

	async getTaskById(
		id: number,
		user: User,
	): Promise<Task> {
		const found = await this.taskRepository.findOne({
			where: { id, user: { id: user.id } },  // search by id and owner user id
		});

		if (!found) {
			throw new NotFoundException(`Task with ID "${id}" not found`);  // Lanza una excepción si no la encuentra
		}

		return found;
	}


	async createTask(createTaskDto: CreateTaskDto,
		user: User,
	): Promise<Task> {
		const { title, description } = createTaskDto;  // Extrae los campos del DTO

		const task = new Task();
		task.title = title;
		task.description = description;
		task.user = user;
		task.status = TaskStatus.OPEN;
		// task.delete = false;
		await task.save(); // Guarda la tarea en la base de datos

		delete (task as any).user;

		return task;
	}

	async updateTaskStatus(
		id: number,
		status: TaskStatus,
		user: User,
	): Promise<Task> {
		const task = await this.getTaskById(id, user);
		task.status = status;
		await task.save();
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

	async deleteTask(
		id: number,
		user: User,
	): Promise<void> {
		const task = await this.getTaskById(id, user);
		if (!task) {
			throw new NotFoundException(`Task with ID "${id}" not found`);
		}
		task.isDeleted = true;
		await task.save(); // o this.taskRepository.save(task);
	}

	// async deleteTask(id: number, user: User): Promise<void> {
	// 	const result = await this.taskRepository.delete({ id, user: { id: user.id } });

	// 	if (result.affected === 0) {
	// 		throw new NotFoundException(`Task with ID "${id}" not found`);
	// 	}
	// }
}
