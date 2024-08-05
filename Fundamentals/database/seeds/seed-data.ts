import { EntityManager } from "typeorm";
import { faker } from "@faker-js/faker";
import { User } from "@/user/user.entity";
import { Playlist } from "@/playlist/playlist.entity";
import * as bcrypt from 'bcryptjs';
import { v4 as uuid4 } from 'uuid';
import { async } from "rxjs";
import { Artist } from "@/artist/artist.entity";

export const seedData = async (manager: EntityManager): Promise<void> => {
    await seedUsers();
    await seedArtists();
    await seedPlaylists();

    async function seedUsers() {
        const salt = await bcrypt.genSalt();
        const encryptedPassword = await bcrypt.hash('123456', salt);

        const user = new User();
        user.firstName = faker.person.firstName();
        user.lastName = faker.person.lastName();
        user.email = faker.internet.email();
        user.password = encryptedPassword;
        user.apiKey = uuid4();

        await manager.getRepository(User).save(user);
    }

    async function seedArtists() {
        const salt = await bcrypt.genSalt();
        const encryptedPassword = await bcrypt.hash('123456', salt);

        const user = new User();
        user.firstName = faker.person.firstName();
        user.lastName = faker.person.lastName();
        user.email = faker.internet.email();
        user.password = encryptedPassword;
        user.apiKey = uuid4();

        const artist = new Artist();
        artist.name = faker.music.songName();
        artist.user = user;

        await manager.getRepository(User).save(user);
        await manager.getRepository(Artist).save(artist);
    }

    async function seedPlaylists() {
        const salt = await bcrypt.genSalt();
        const encryptedPassword = await bcrypt.hash('123456', salt);

        const user = new User();
        user.firstName = faker.person.firstName();
        user.lastName = faker.person.lastName();
        user.email = faker.internet.email();
        user.password = encryptedPassword;
        user.apiKey = uuid4();

        const playlist = new Playlist();
        playlist.name = faker.music.genre();
        playlist.user = user;

        await manager.getRepository(User).save(user);
        await manager.getRepository(Playlist).save(playlist);
    }
}