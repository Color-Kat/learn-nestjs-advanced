import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from "@nestjs/mongoose";
import { SongModule } from './song/song.module';

@Module({
  imports: [
      MongooseModule.forRoot('mongodb://localhost:27017/spotify_clone'),
      SongModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
