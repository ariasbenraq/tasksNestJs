// Esta interface define cómo debe estar estructurada una tarea
// Cada tarea debe tener estos 4 campos obligatorios
export interface Task {
    id: string;               // Identificador único de la tarea
    title: string;            // Título o nombre de la tarea
    description: string;      // Breve descripción
    status: TaskStatus;       // Estado actual de la tarea (OPEN, etc.)
}

// Este enum define los posibles estados que puede tener una tarea
// Sirve para limitar los valores a opciones válidas
export enum TaskStatus {
    OPEN = 'OPEN',                    // Tarea recién creada
    IN_PROGRESS = 'IN_PROGRESS',      // Tarea que se está realizando
    DONE = 'DONE',                    // Tarea terminada
}
