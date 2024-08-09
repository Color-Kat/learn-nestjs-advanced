describe('Mock Function examples', () => {
    it('should create a basic mock function', () => {
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(777);

        expect(mockFunction()).toBe(777);
        expect(mockFunction()).toBe(777);
        expect(mockFunction.mock.calls.length).toBe(2);
        expect(mockFunction).toHaveBeenCalled();
    });

    it('should create a mock function with an argument', () => {
        const mockCreateSong = jest.fn((createSongDto) => ({...createSongDto, id: 1}));
        expect(mockCreateSong({title: 'title'})).toEqual({title: 'title', id: 1});
    });

    it('should create a mock function with an implementation', () => {
        const mockCreateSong = jest.fn();
        mockCreateSong.mockImplementation((createSongDto) => ({...createSongDto, id: 1}));

        expect(mockCreateSong({title: 'title'})).toEqual({title: 'title', id: 1});
    });

    it('should create a mock function with promise', () => {
        const fetchSongs = jest.fn();
        fetchSongs.mockResolvedValue({id: 1});

        expect(fetchSongs()).resolves.toEqual({id: 1});
    });
});