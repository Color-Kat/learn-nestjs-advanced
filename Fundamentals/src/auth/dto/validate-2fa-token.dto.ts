import { IsNotEmpty, IsString } from "class-validator";

export class Validate2FATokenDto {
    @IsNotEmpty()
    @IsString()
    token: string;
}