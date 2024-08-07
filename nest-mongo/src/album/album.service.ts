import { Injectable } from '@nestjs/common';
import { Album, AlbumDocument } from "@/album/schemas/album.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Song } from "@/song/schemas/song";
import { CreateAlbumDto } from "@/album/dto/create-album.dto";

@Injectable()
export class AlbumService {

    constructor(
        @InjectModel(Album.name)
        private readonly albumModel: Model<AlbumDocument>
    ) {
    }

    async findAllAlbums(): Promise<Album[]> {
        return this.albumModel
            .find()
            .populate('songs', null, Song.name)
            ;
    }

    async createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
        return this.albumModel.create(createAlbumDto);
    }

}
