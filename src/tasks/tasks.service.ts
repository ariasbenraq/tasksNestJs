// Importamos herramientas de NestJS y tipos necesarios
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';

// Importamos 'uuid' para generar IDs únicos
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

// Decorador que permite que esta clase sea inyectada como servicio
@Injectable()
export class TasksService {
    // Arreglo privado que actúa como almacenamiento temporal (memoria)
    // Aquí se guardarán todas las tareas creadas
    private tasks: Task[] = [];

    // Este método devuelve todas las tareas almacenadas
    getAllTasks(): Task[] {
        return this.tasks;  // Devuelve el array completo de tareas
    }

    getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
        const { status, search } = filterDto;  // Extrae los filtros del DTO

        let tasks = this.getAllTasks();  // Obtiene todas las tareas

        if (status) {
            tasks = tasks.filter(task => task.status === status);  // Filtra por estado
        }

        if (search) {
            tasks = tasks.filter(task =>
                task.title.includes(search) || task.description.includes(search),
            );  // Filtra por búsqueda en título o descripción
        }

        return tasks;
    }


    // Este método busca una tarea por su ID y la devuelve
    // Si no encuentra la tarea, devuelve undefined
    // El ID es un string que se pasa como argumento
    // El método utiliza el método find del array para buscar la tarea
    // que coincida con el ID proporcionado
    // El tipo de retorno es Task o undefined, ya que puede no encontrar la tarea
    getTaskById(id: string): Task | undefined {
        
        const found = this.tasks.find(task => task.id === id);  // Busca la tarea por ID

        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);  // Lanza una excepción si no la encuentra
        }

        return found;  // Devuelve la tarea encontrada o undefined si no existe
    }

    // Este método crea una nueva tarea y la devuelve
    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;  // Extrae los campos del DTO
        // Crea una tarea usando los datos recibidos
        // Genera un id único usando uuidv4()
        // El estado inicial siempre es OPEN
        const task: Task = {
            id: uuidv4(),            // ID único para la tarea
            title,                   // Asignamos el título recibido
            description,             // Asignamos la descripción recibida
            status: TaskStatus.OPEN  // Estado inicial predefinido
        };

        // Agrega la tarea al arreglo interno
        this.tasks.push(task);

        // Devuelve la tarea creada como respuesta
        return task;
    }

    updateTaskStatus(id: string, status: TaskStatus): Task | undefined {
        // Busca la tarea por ID
        const task = this.getTaskById(id);
        if (task) {
            task.status = status;  // Actualiza el estado de la tarea
        }
        return task;  // Devuelve la tarea actualizada o undefined
    }

    deleteTask(id: string): void {
        const found = this.getTaskById(id);  // Verifica si la tarea existe
        // Filtra el arreglo de tareas para eliminar la tarea con el ID especificado
        this.tasks = this.tasks.filter(task => task.id !== found?.id);
        // No devuelve nada, solo actualiza el arreglo interno
    }
}
