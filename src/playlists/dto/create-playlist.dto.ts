import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePlaylistDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    songs: number[];

    @IsNotEmpty()
    @IsNumber()
    user: number;
}