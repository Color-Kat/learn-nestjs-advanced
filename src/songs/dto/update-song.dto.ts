import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateSongDto {
    @IsOptional()
    @IsString()
    readonly title?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    readonly artists?: string[];

    @IsOptional()
    @IsDateString()
    readonly  releasedDate?: Date;

    @IsOptional()
    @IsMilitaryTime()
    readonly duration?: Date;

    @IsOptional()
    @IsString()
    readonly lyrics?: string;
}