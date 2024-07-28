import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSongDto {

    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsNotEmpty()
    @IsArray()
    // "each" tells class-validator to run the validation on each item of the array
    @IsNumber({}, { each: true })
    readonly artists: number[];

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