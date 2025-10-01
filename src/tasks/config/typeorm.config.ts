import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "../../auth/user.entity";
import { Task } from "../task.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: '192.168.18.10',
    port: 5432,
    username: 'admin',
    password: 'CambiaEstaClaveFuerte123!',
    database: 'taskmanagement',
    // entities: [__dirname + '/../**/*.entity.{js,ts}'],
    entities: [User, Task],
    synchronize: true, // Solo para desarrollo, no usar en producción
};