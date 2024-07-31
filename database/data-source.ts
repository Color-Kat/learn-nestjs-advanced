import { DataSource, DataSourceOptions } from "typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { User } from "@/user/user.entity";
import { Song } from "@/song/song.entity";
import { Artist } from "@/artist/artist.entity";
import { Playlist } from "@/playlist/playlist.entity";


export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    database: 'spotify_clone',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',

    entities: ['dist/**/*.entity.js'],
    synchronize: true,
    migrations: ['dist/database/migrations/*.js']
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;


// Not work
// export const dataSourceOptionsAsync: (
//     configService: ConfigService
// ) => Promise<DataSourceOptions> = async (
//     configService
// ): Promise<DataSourceOptions> => ({
//     type: configService.get<'postgres' | 'mysql'>('DB_DRIVER'),
//     host: configService.get<string>('DB_HOST'),
//     port: configService.get<number>('DB_PORT'),
//     database: configService.get<string>('DB_NAME'),
//     username: configService.get<string>('DB_USERNAME'),
//     password: configService.get<string>('DB_PASSWORD'),
//
//     entities: ['dist/**/*.entity.js'],
//     synchronize: true,
//     migrations: ['dist/db/migrations/*.js']
// });