import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { SongsService } from "./songs.service";
import { CreateSongDto } from "./dto";
import { UpdateSongDto } from "./dto/update-song.dto";

@Controller("songs")
export class SongsController {

    constructor(private songsService: SongsService) {
    }

    @Get()
    findAll() {
        return this.songsService.findAll();
    }

    @Get(":id")
    findOne(
        @Param("id", new ParseIntPipe()) id: number
    ) {
        return this.songsService.findOne(id);
    }

    @Post()
    create(
        @Body() dto: CreateSongDto
    ) {
        return this.songsService.create(dto);
    }

    @Put(":id")
    update(
        @Param("id", new ParseIntPipe()) id: number,
        @Body() dto: UpdateSongDto
    ) {
        return this.songsService.update(
            id,
            dto
        );
    }

    @Delete(":id")
    delete(
        @Param("id", new ParseIntPipe()) id: number
    ) {
        return this.songsService.remove(id)
    }
}
