import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateSongDto {
    @IsOptional()
    @IsString()
    readonly title?: string;

    @IsOptional()
    @IsArray()
    @IsNumber({}, { each: true })
    readonly artists?: number[];

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