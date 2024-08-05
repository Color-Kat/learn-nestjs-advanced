import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Playlist } from "@/playlist/playlist.entity";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @ApiProperty({
        example: "Coco",
        description: "Provide the firstName of the user"
    })
    firstName: string;

    @Column()
    @ApiProperty({
        example: "Shanel",
        description: "Provide the lastName of the user"
    })
    lastName: string;

    @Column({ unique: true })
    @ApiProperty({
        example: "coco@co.co",
        description: "Provide the email of the user"
    })
    email: string;

    @Column()
    @Exclude()
    @ApiProperty({
        example: "123456",
        description: "Provide the password of the user"
    })
    password: string;

    @Column({nullable: true, type: 'text'})
    twoFASecret: string;

    @Column({default: false, type: 'boolean'})
    enable2FA: boolean;

    @Column()
    apiKey: string;

    // User can create many playlists
    @OneToMany(() => Playlist, (playlist) => playlist.user)
    playlists: Playlist[];
}