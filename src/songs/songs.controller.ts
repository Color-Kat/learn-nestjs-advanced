import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { SongsService } from "./songs.service";
import { CreateSongDto } from "./dto";

@Controller("songs")
export class SongsController {

    constructor(
        private songsService: SongsService
    ) {
    }

    @Get()
    findAll() {
        return this.songsService.findAll();
    }

    @Get(":id")
    findOne() {
        return "fetch song on the based on id";
    }

    @Post()
    create(
        @Body() dto: CreateSongDto
    ) {
        console.log(dto);
        return this.songsService.create('Create a new song');
    }

    @Put(":id")
    update() {
        return "update song on the based on id";
    }

    @Delete(":id")
    delete() {
        return "delete song on the based on id";
    }
}
