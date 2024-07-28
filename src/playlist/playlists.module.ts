import { Module } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { PlaylistsController } from './playlists.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Playlist } from "./playlist.entity";
import { User } from "@/user/user.entity";
import { Song } from "@/song/song.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, User, Song])],
  controllers: [PlaylistsController],
  providers: [PlaylistsService],
})
export class PlaylistsModule {}
