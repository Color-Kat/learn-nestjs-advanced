describe('Mock Function examples', () => {
    it('should create a basic mock function', () => {
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(777);

        expect(mockFunction()).toBe(777);
        expect(mockFunction()).toBe(777);
        expect(mockFunction.mock.calls.length).toBe(2);
        expect(mockFunction).toHaveBeenCalled();
    })
});