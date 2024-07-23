import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Song } from "./song.entity";
import { CreateSongDto } from "./dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class SongsService {
    // local array instead of db
    private readonly songs = [];

    constructor(
        @InjectRepository(Song)
        private songsRepository: Repository<Song>
    ) {

    }

    findAll() {
        // return this.songsRepositry));
    }

    create(songDto: CreateSongDto): Promise<Song> {
        const song = new Song();
        song.title = songDto.title;
        song.artists = songDto.artists;
        song.duration = songDto.duration;
        song.lyrics = songDto.lyrics;
        song.releasedDate = songDto.releasedDate;

        return this.songsRepository.save(song);
    }
}
