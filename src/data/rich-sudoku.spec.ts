import { getTotalPages } from "."

describe('getTotalPages', () => {
    test('test transition values', () => {
        expect(getTotalPages(10, 3)).toBe(4);
        expect(getTotalPages(9, 3)).toBe(3);
    })

    test('test transition values', () => {
        expect(getTotalPages(7, 3)).toBe(3);
        expect(getTotalPages(6, 3)).toBe(2);
    })
})
