import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";
import { Song } from "../song/song.entity";

@Entity('artists')
export class Artist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @ManyToMany(() => Song, (song) => song.artists)
    @JoinTable({name: 'songs_artists'})
    songs: Song[];
}