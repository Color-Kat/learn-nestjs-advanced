import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { Song } from "./song.entity";
import { CreateSongDto } from "./dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateSongDto } from "./dto/update-song.dto";
import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";

@Injectable()
export class SongsService {
    // local array instead of db
    private readonly songs = [];

    constructor(
        @InjectRepository(Song)
        private songsRepository: Repository<Song>
    ) {

    }

    findAll(): Promise<Song[]> {
        return this.songsRepository.find();
    }

    paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
        const queryBuilder = this.songsRepository.createQueryBuilder('songs');
        queryBuilder.orderBy('songs.releasedDate', 'DESC')
        queryBuilder.orderBy('songs.id', 'DESC')

        return paginate<Song>(queryBuilder, options);
    }

    findOne(id: number): Promise<Song> {
        return this.songsRepository.findOneBy({ id });
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

    update(id: number, songDto: UpdateSongDto): Promise<UpdateResult> {
        return this.songsRepository.update({id}, songDto);
    }

    remove(id: number): Promise<DeleteResult> {
        return this.songsRepository.delete({ id });
    }
}
