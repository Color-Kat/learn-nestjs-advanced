import { Body, Controller, Get, Post } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from "@/album/dto/create-album.dto";
import { Album } from "@/album/schemas/album.schema";

@Controller('albums')
export class AlbumController {
    constructor(
        private readonly albumService: AlbumService
    ) {
    }

    @Get()
    findAllAlbums(): Promise<Album[]> {
        return this.albumService.findAllAlbums();
    }

    @Post()
    createAlbum(
        @Body() createAlbumDto: CreateAlbumDto
    ): Promise<Album> {
        return this.albumService.createAlbum(createAlbumDto);
    }
}
