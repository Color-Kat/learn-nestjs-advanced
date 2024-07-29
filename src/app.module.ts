import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@/user/user.entity";
import { PlaylistsModule } from "@/playlist/playlists.module";
import { AuthModule } from "@/auth/auth.module";
import { DataSource } from "typeorm";
import { LoggerMiddleware } from "@/common/middleware/logger/logger.middleware";
import { Song } from "@/song/song.entity";
import { Artist } from "@/artist/artist.entity";
import { Playlist } from "@/playlist/playlist.entity";
import { SongModule } from "@/song/song.module";
import { SongController } from "@/song/song.controller";
import { UserModule } from "@/user/user.module";
import { ConfigModule } from "@nestjs/config";
import { ArtistModule } from './artist/artist.module';

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
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
        SongModule,
        PlaylistsModule,
        AuthModule,
        UserModule,
        ArtistModule,
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule implements NestModule {
    constructor(private dataSource: DataSource) {
    }

    configure(consumer: MiddlewareConsumer): any {
        // consumer.apply(LoggerMiddleware).forRoutes('songs');
        // consumer.apply(LoggerMiddleware).forRoutes({path: 'songs', method: RequestMethod.POST});

        consumer.apply(LoggerMiddleware).forRoutes(SongController);
    }

}
