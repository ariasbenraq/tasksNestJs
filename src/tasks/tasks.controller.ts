// Importamos decoradores y utilidades necesarias de NestJS
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';

// Importamos el servicio que vamos a usar (lógica de negocio)
import { TasksService } from './tasks.service';

// Importamos el tipo Task, que define la forma de las tareas
import { Task } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

// Este decorador define que esta clase es un controller
// Y que todas sus rutas empiezan con /tasks
@Controller('tasks')
export class TasksController {

    // El constructor recibe una instancia del servicio TasksService
    // NestJS inyecta esta dependencia automáticamente
    constructor(private tasksService: TasksService) { }

    // Este handler responde a solicitudes HTTP GET en /tasks
    // Su propósito es devolver todas las tareas existentes
    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[] {
        if (Object.keys(filterDto).length) {
            return this.tasksService.getTasksWithFilters(filterDto);
        } else {
            // Si no hay filtros, devuelve todas las tareas
            // Llama al método del service para obtener todas las tareas
            // y las devuelve como respuesta
            return this.tasksService.getAllTasks();
        }
    }

    // Este handler responde a solicitudes HTTP GET en /tasks/:id
    // Su propósito es devolver una tarea específica por su ID
    // El :id es un parámetro de ruta que se captura automáticamente
    // y se pasa al método como argumento
    @Get('/:id')
    getTaskById(@Param('id') id: string): Task | undefined {
        // Llama al método del service para obtener una tarea por ID
        return this.tasksService.getTaskById(id);
    }

    // Este handler responde a solicitudes HTTP POST en /tasks
    // Sirve para crear una nueva tarea con los datos enviados
    @Post()
    @UsePipes(ValidationPipe) // Usa un pipe de validación para validar el DTO
    // El cuerpo de la solicitud debe cumplir con la estructura definida en CreateTaskDto
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        // Llama al método del service, pasándole los datos recibidos
        // Devuelve la tarea recién creada
        return this.tasksService.createTask(createTaskDto);
    }

    // Este handler responde a solicitudes HTTP DELETE en /tasks/:id
    // Su propósito es eliminar una tarea específica por su ID
    @Post('/:id/delete')
    deleteTask(@Param('id') id: string): void {
        // Llama al método del service para eliminar la tarea por ID
        this.tasksService.deleteTask(id);
    }

    // Este handler responde a solicitudes HTTP PATCH en /tasks/:id/status
    // Su propósito es actualizar el estado de una tarea específica por su ID
    // Utiliza el decorador @Patch para indicar que es una operación de actualización parcial
    // El :id es un parámetro de ruta que se captura automáticamente
    // y se pasa al método como argumento
    // El estado se recibe en el cuerpo de la solicitud como un string
    // y se convierte al tipo TaskStatus dentro del service
    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status', TaskStatusValidationPipe) status: string,
    ): Task | undefined {
        // Llama al método del service para actualizar el estado de la tarea
        // El estado se pasa como un string, pero el service lo maneja como TaskStatus
        return this.tasksService.updateTaskStatus(id, status as Task['status']);
    }

    // Este handler responde a solicitudes HTTP DELETE en /tasks/:id
    // Su propósito es eliminar una tarea específica por su ID
    // Utiliza el decorador @Delete para indicar que es una operación de eliminación
    // El :id es un parámetro de ruta que se captura automáticamente
    // y se pasa al método como argumento
    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): void {
        // Llama al método del service para eliminar la tarea por ID
        this.tasksService.deleteTask(id);
    }
}
