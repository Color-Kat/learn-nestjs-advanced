import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SongService } from './song.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Song } from "@/song/schemas/song";

@Controller('songs')
export class SongController {
    constructor(private readonly songService: SongService) {
    }

    @Post()
    createSong(
        @Body() createSongDto: CreateSongDto
    ): Promise<Song> {
        return this.songService.createSong(createSongDto);
    }

    @Get()
    findAllSongs(): Promise<Song[]> {
        return this.songService.findAllSongs();
    }

    @Get(':id')
    findSongById(
        @Param('id') id: string
    ): Promise<Song> {
        return this.songService.findSongById(id);
    }

    // @Patch(':id')
    // update(
    //     @Param('id') id: string,
    //     @Body() updateSongDto: UpdateSongDto
    // ) {
    //     return this.songService.update(id, updateSongDto);
    // }

    @Delete(':id')
    deleteSong(
        @Param('id') id: string
    ) {
        return this.songService.deleteSong(id);
    }
}
