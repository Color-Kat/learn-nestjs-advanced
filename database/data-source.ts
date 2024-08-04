import { DataSource, DataSourceOptions } from "typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as process from "process";

// Not work
export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    imports   : [ConfigModule],
    inject    : [ConfigService],
    useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
        return {
            type    : "postgres",
            host    : configService.get<string>("database.host"),
            port    : configService.get<number>("database.port"),
            database: configService.get<string>("database.name"),
            username: configService.get<string>("database.username"),
            password: configService.get<string>("database.password"),

            entities   : ["dist/**/*.entity.js"],
            synchronize: false,
            migrations : ["dist/db/migrations/*.js"]
        };
    }
};


export const dataSourceOptions: DataSourceOptions = {
    type    : "postgres",
    database: process.env.DB_NAME,
    host    : process.env.DB_HOST,
    port    : parseInt(process.env.DB_PORT) || 3000,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,

    entities   : ["dist/**/*.entity.js"],
    synchronize: false,
    migrations : ["dist/database/migrations/*.js"]
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;