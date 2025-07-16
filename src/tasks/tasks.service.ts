// Importamos herramientas de NestJS y tipos necesarios
import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';

// Importamos 'uuid' para generar IDs únicos
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

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
}
