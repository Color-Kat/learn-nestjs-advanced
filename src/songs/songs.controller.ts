import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { SongsService } from "./songs.service";
import { CreateSongDto } from "./dto";

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
        @Param(
            "id",
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
        ) id: number
    ) {
        console.log(typeof id);
        return "fetch song on the based on id";
    }

    @Post()
    create(
        @Body() dto: CreateSongDto
    ) {
        return this.songsService.create("Create a new song");
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
