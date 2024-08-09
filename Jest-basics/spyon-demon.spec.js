const songRepository = {
    create: (createSongDto) => {
    },
    find: () => {
    },
    findOne: (id) => {
    },
}

describe('Spy on demo', () => {
    it('should spy on existing object method', () => {
        const spy = jest.spyOn(songRepository, 'create');

        songRepository.create({title: 'Dont spy on me!'});

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith({title: 'Dont spy on me!'});
    });
});