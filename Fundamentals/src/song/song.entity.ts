import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Playlist } from "../playlist/playlist.entity";
import { Artist } from "../artist/artist.entity";

@Entity('songs')
export class Song {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('date')
    releasedDate: Date;

    @Column('time')
    duration: Date;

    @Column('text', { nullable: true })
    lyrics: string;

    @ManyToMany(() => Artist, (artist) => artist.songs, {cascade: true})
    @JoinTable({name: 'songs_artists'})
    artists: Artist[];

    @ManyToOne(() => Playlist, (playlist) => playlist.songs)
    playlist: Playlist;

}