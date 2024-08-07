import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Model } from "mongoose";
import { Song, SongDocument } from "@/song/schemas/song";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class SongService {
    constructor(
        @InjectModel(Song.name)
        private readonly songModel: Model<SongDocument>
    ) {
    }

    async createSong(createSongDto: CreateSongDto): Promise<Song> {
        const song = await this.songModel.create(createSongDto);

        return song;
    }

    findAllSongs(): Promise<Song[]> {
        return this.songModel.find();
    }

    findSongById(id: string): Promise<Song> {
        return this.songModel.findById(id);
    }

    // update(id: string, updateSongDto: UpdateSongDto) {
    //     return `This action updates a #${id} song`;
    // }

    deleteSong(id: string) {
        return this.songModel.deleteOne({ _id: id });
    }
}
