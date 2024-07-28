import { Module } from '@nestjs/common';
import { SongController } from './song.controller';
import { SongService } from './song.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Song } from "./song.entity";
import { Artist } from "@/artist/artist.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Song, Artist])],
  controllers: [SongController],
  providers: [SongService]
})
export class SongModule {}
