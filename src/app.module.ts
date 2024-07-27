import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SongsModule } from "./songs/songs.module";
import { LoggerMiddleware } from "./common/middleware/logger/logger.middleware";
import { SongsController } from "./songs/songs.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Song } from "./songs/song.entity";
import { User } from "./users/user.entity";
import { Artist } from "./artists/artist.entity";
import { Playlist } from "./playlists/playlist.entity";
import { PlaylistsModule } from './playlists/playlists.module';

@Module({
    imports: [
        SongsModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            database: 'spotify_clone',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'root',
            entities: [User, Song, Artist, Playlist],
            synchronize: true
        }),
        PlaylistsModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule implements NestModule {
    constructor(private dataSource: DataSource) {
        console.log(dataSource.driver.database)
    }

    configure(consumer: MiddlewareConsumer): any {
        // consumer.apply(LoggerMiddleware).forRoutes('songs');
        // consumer.apply(LoggerMiddleware).forRoutes({path: 'songs', method: RequestMethod.POST});

        consumer.apply(LoggerMiddleware).forRoutes(SongsController);
    }

}
