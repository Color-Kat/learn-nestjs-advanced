import { Injectable } from '@nestjs/common';
import { In, Repository } from "typeorm";
import { Playlist } from "./playlist.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { Song } from "../song/song.entity";
import { User } from "../user/user.entity";

@Injectable()
export class PlaylistsService {
    constructor(
        @InjectRepository(Playlist)
        private readonly playlistsRepository: Repository<Playlist>,

        @InjectRepository(Song)
        private readonly songRepository: Repository<Song>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
    }

    async create(playlistDto: CreatePlaylistDto): Promise<Playlist> {
        const playlist = new Playlist();
        playlist.name = playlistDto.name;

        // Attach songs to the playlist by provided in dto song ids
        const songs = await this.songRepository.findBy({id: In(playlistDto.songs)});
        playlist.songs = songs;

        // Attach user by id
        const user = await this.userRepository.findOneBy({id: playlistDto.user});
        playlist.user = user;

        return this.playlistsRepository.save(playlist);
    }
}
