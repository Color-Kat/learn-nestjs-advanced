import { Injectable } from "@nestjs/common";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { Song } from "./song.entity";
import { CreateSongDto } from "./dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateSongDto } from "./dto/update-song.dto";
import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";
import { Artist } from "../artist/artist.entity";

@Injectable()
export class SongService {
    // local array instead of db
    private readonly songs = [];

    constructor(
        @InjectRepository(Song)
        private readonly songRepository: Repository<Song>,

        @InjectRepository(Artist)
        private readonly artistRepository: Repository<Artist>,
    ) {

    }

    findAll(): Promise<Song[]> {
        return this.songRepository.find();
    }

    paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
        const queryBuilder = this.songRepository.createQueryBuilder('songs');
        queryBuilder.orderBy('songs.releasedDate', 'DESC')
        queryBuilder.orderBy('songs.id', 'DESC')

        return paginate<Song>(queryBuilder, options);
    }

    findOne(id: number): Promise<Song> {
        return this.songRepository.findOneBy({ id });
    }

    async create(songDto: CreateSongDto): Promise<Song> {
        const song = new Song();
        song.title = songDto.title;
        song.duration = songDto.duration;
        song.lyrics = songDto.lyrics;
        song.releasedDate = songDto.releasedDate;

        const artists = await this.artistRepository.findByIds(songDto.artists);
        song.artists = artists;

        return this.songRepository.save(song);
    }

    async update(id: number, songDto: UpdateSongDto): Promise<UpdateResult> {
        // TODO fix updating
        return this.songRepository.update({id}, songDto as any);
    }

    remove(id: number): Promise<DeleteResult> {
        return this.songRepository.delete({ id });
    }
}
