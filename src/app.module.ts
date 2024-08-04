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
import { ArtistModule } from "./artist/artist.module";
import { UrlService } from "@/common/url.service";
import { dataSourceOptions, typeOrmAsyncConfig } from "../database/data-source";
import { SeedModule } from "./seed/seed.module";
import configuration from "@/config/configuration";

@Module({
    imports    : [
        ConfigModule.forRoot({
            isGlobal: true,
            load    : [configuration]
        }),
        TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
        SongModule,
        PlaylistsModule,
        AuthModule,
        UserModule,
        ArtistModule,
        SeedModule
    ],
    controllers: [AppController],
    providers  : [
        AppService,
        UrlService
    ]
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
