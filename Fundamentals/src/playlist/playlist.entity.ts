import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Song } from "@/song/song.entity";
import { User } from "@/user/user.entity";

@Entity('playlists')
export class Playlist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Song, (song) => song.playlist)
    songs: Song[];

    @ManyToOne(() => User, (user) => user.playlists)
    user: User;
}