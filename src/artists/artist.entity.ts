import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Song } from "../songs/song.entity";

@Entity('artists')
export class Artist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Song, (song) => song.artists)
    @JoinTable({name: 'songs_artists'})
    songs: Song[];
}