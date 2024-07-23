import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSongDto {

    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsNotEmpty()
    @IsArray()
    // "each" tells class-validator to run the validation on each item of the array
    @IsString({ each: true })
    readonly artists: string[];

    @IsNotEmpty()
    @IsDateString()
    readonly  releasedDate: Date;

    @IsNotEmpty()
    @IsMilitaryTime()
    readonly duration: Date;

    @IsOptional()
    @IsString()
    readonly lyrics?: string;
}