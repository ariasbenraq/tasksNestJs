import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../tasks.model";

export class GetTaskFilterDto {
    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    // El decorador IsIn valida que el estado sea uno de los permitidos
    // Si no se proporciona, se considera opcional
    // y no se aplica filtro por estado
    // Si se proporciona, se filtran las tareas por este estado
    // TaskStatus es un enum que define los estados posibles de una tarea
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    // El decorador IsNotEmpty asegura que si se proporciona un valor,
    // no puede estar vacío
    // Este campo se usa para buscar tareas por título o descripción
    // Si se proporciona, se filtran las tareas que contienen el texto
    // en el título o la descripción
    // Si no se proporciona, no se aplica filtro por búsqueda
    // El decorador IsOptional indica que este campo es opcional
    search: string;
}