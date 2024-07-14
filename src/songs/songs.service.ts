import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class SongsService {
    // local array instead of db
    private readonly songs = [];

    findAll() {
        return this.songs;
    }

    create(song) {
        this.songs.push(song);

        return this.songs;
    }
}
