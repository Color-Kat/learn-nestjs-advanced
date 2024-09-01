import { Test, TestingModule } from '@nestjs/testing';
import { SongController } from './song.controller';
import { SongService } from "@/song/song.service";

describe('SongsController', () => {
    let controller: SongController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SongController],
            providers  : [{
                provide : SongService,
                useValue: {
                    findAll: jest
                        .fn()
                        .mockResolvedValue({ id: 1, title: 'Title' })
                }
            }]
        }).compile();

        controller = module.get<SongController>(SongController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('Fetch all the songs', () => {
        it('should fetch all the songs', async () => {
            const songs = await controller.findAll();
            expect(songs).toEqual({ id: 1, title: 'Title' });
        });
    });
});
