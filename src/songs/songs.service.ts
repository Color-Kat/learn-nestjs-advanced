import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { Song } from "./song.entity";
import { CreateSongDto } from "./dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateSongDto } from "./dto/update-song.dto";
import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";
import { Artist } from "../artists/artist.entity";

@Injectable()
export class SongsService {
    // local array instead of db
    private readonly songs = [];

    constructor(
        @InjectRepository(Song)
        private readonly songsRepository: Repository<Song>,

        @InjectRepository(Artist)
        private readonly artistsRepository: Repository<Artist>,
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

    async create(songDto: CreateSongDto): Promise<Song> {
        const song = new Song();
        song.title = songDto.title;
        song.duration = songDto.duration;
        song.lyrics = songDto.lyrics;
        song.releasedDate = songDto.releasedDate;

        const artists = await this.artistsRepository.findByIds(songDto.artists);
        song.artists = artists;

        return this.songsRepository.save(song);
    }

    update(id: number, songDto: UpdateSongDto): Promise<UpdateResult> {
        return this.songsRepository.update({id}, songDto as any);
    }

    remove(id: number): Promise<DeleteResult> {
        return this.songsRepository.delete({ id });
    }
}
