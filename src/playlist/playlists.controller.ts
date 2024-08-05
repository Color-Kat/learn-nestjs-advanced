import { Body, Controller, Post } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller('playlists')
@ApiTags("Playlists")
export class PlaylistsController {
    constructor(private readonly playlistsService: PlaylistsService) {
    }

    @Post()
    create(
        @Body() playlistDto: CreatePlaylistDto
    ) {
        return this.playlistsService.create(playlistDto);
    }
}
