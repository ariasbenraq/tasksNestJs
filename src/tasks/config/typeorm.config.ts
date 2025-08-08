import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: '192.168.18.10',
    port: 5432,
    username: 'admin',
    password: 'CambiaEstaClaveFuerte123!',
    database: 'taskmanagement',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true, // Solo para desarrollo, no usar en producción
};