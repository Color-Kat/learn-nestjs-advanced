import { Module } from '@nestjs/common';
import { SongService } from './song.service';
import { SongController } from './song.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Song, SongSchema } from "@/song/schemas/song";

@Module({
  imports: [
      MongooseModule.forFeature([{name: Song.name, schema: SongSchema}])
  ],
  controllers: [SongController],
  providers: [SongService],
})
export class SongModule {}
