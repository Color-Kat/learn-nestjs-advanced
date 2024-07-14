import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class SongsService {
    // local array instead of db
    private readonly songs = [];

    findAll() {
        throw new HttpException(
            'mess',
            HttpStatus.GATEWAY_TIMEOUT, {
                cause: new Error('mess123'),
            }
        );
        return this.songs;
    }

    create(song) {
        this.songs.push(song);

        return this.songs;
    }
}
