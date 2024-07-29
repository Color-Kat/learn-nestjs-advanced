import { Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { Artist } from "@/artist/artist.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ArtistService {
    constructor(
        @InjectRepository(Artist)
        private readonly artistRepository: Repository<Artist>
    ) {}

    findArtistByUserId(userId: number): Promise<Artist> {
        return this.artistRepository.findOneBy({user: {id: userId}});
    }
}
