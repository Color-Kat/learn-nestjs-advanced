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

    async create(createSongDto: CreateSongDto): Promise<Song> {
        const song = await this.songModel.create(createSongDto);

        return song;
    }

    findAll() {
        return `This action returns all song`;
    }

    findOne(id: number) {
        return `This action returns a #${id} song`;
    }

    update(id: number, updateSongDto: UpdateSongDto) {
        return `This action updates a #${id} song`;
    }

    remove(id: number) {
        return `This action removes a #${id} song`;
    }
}
