// Importamos decoradores y utilidades necesarias de NestJS
import { Body, Controller, Get, Post } from '@nestjs/common';

// Importamos el servicio que vamos a usar (lógica de negocio)
import { TasksService } from './tasks.service';

// Importamos el tipo Task, que define la forma de las tareas
import { Task } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';

// Este decorador define que esta clase es un controller
// Y que todas sus rutas empiezan con /tasks
@Controller('tasks')
export class TasksController {

    // El constructor recibe una instancia del servicio TasksService
    // NestJS inyecta esta dependencia automáticamente
    constructor(private tasksService: TasksService) {}

    // Este handler responde a solicitudes HTTP GET en /tasks
    // Su propósito es devolver todas las tareas existentes
    @Get()
    getAllTasks(): Task[] {
        // Llama al método del service para obtener las tareas
        return this.tasksService.getAllTasks();
    }

    // Este handler responde a solicitudes HTTP POST en /tasks
    // Sirve para crear una nueva tarea con los datos enviados
    @Post()
    createTask(@Body()createTaskDto: CreateTaskDto): Task {
        // Llama al método del service, pasándole los datos recibidos
        // Devuelve la tarea recién creada
        return this.tasksService.createTask(createTaskDto);
    }
}
