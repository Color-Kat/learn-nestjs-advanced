import {
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query, Request, UseGuards
} from "@nestjs/common";
import { SongService } from "./song.service";
import { CreateSongDto } from "./dto";
import { UpdateSongDto } from "./dto/update-song.dto";
import { ArtistGuard } from "@/auth/guards";
import { ApiTags } from "@nestjs/swagger";

@Controller("songs")
@ApiTags("Songs")
export class SongController {

    constructor(private songsService: SongService) {}

    @Get('/all')
    findAll() {
        return this.songsService.findAll();
    }

    @Get()
    findAllWithPagination(
        @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number = 10
    ) {
        limit = Math.min(limit, 100);

        return this.songsService.paginate({
                                              page,
                                              limit
                                          });
    }

    @Get(":id")
    findOne(
        @Param("id", new ParseIntPipe()) id: number
    ) {
        return this.songsService.findOne(id);
    }


    @Post()
    @UseGuards(ArtistGuard)
    create(
        @Body() dto: CreateSongDto,
        @Request() req
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
        return this.songsService.remove(id);
    }
}
