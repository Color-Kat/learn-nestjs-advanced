const sum = require("./sum");

test('It should give the result 1 + 2 = 3', () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(77, 33)).toBe(110);
});