const script = require('../index');
const summ = script.summ;
const subtract = script.subtract;
const multiply = script.multiply;
const division = script.division;


describe('Функция summ()', () => {
    it('должна возвращать сумму 7 при аргументах (3, 4)', () => {
        expect(summ(3, 4)).toBe(7);
    });

    it('должна возвращать null при аргументах (null, 2)', () => {
        expect(summ(null, 2)).toBeNull();
    })

    it('должна возвращать null при аргументах (undefined, null)', () => {
        expect(summ(undefined, null)).toBeNull();
    })

    it('должна возвращать null при аргументах ("4", "2")', () => {
        expect(summ("4", "2")).toBeNull();
    })
});

describe('Функция subtract()', () => {
    it('должна возвращать разницу 4 при аргументах (8, 4)', () => {
        expect(subtract(8, 4)).toBe(4);
    });

    it('должна возвращать null при аргументах (null, 6)', () => {
        expect(subtract(null, 6)).toBeNull();
    })

    it('должна возвращать null при аргументах (undefined, null)', () => {
        expect(subtract(undefined, null)).toBeNull();
    })

    it('должна возвращать null при аргументах ("4", "2")', () => {
        expect(subtract("4", "2")).toBeNull();
    })
});

describe('Функция multiply()', () => {
    it('должна возвращать 50 при аргументах (5, 10)', () => {
        expect(multiply(5, 10)).toBe(50);
    });

    it('должна возвращать null при аргументах (null, 2)', () => {
        expect(multiply(null, 2)).toBeNull();
    })

    it('должна возвращать null при аргументах (undefined, null)', () => {
        expect(multiply(undefined, null)).toBeNull();
    })

    it('должна возвращать null при аргументах ("4", "2")', () => {
        expect(multiply("4", "2")).toBeNull();
    })
});

describe('Функция division()', () => {
    it('должна возвращать 3 при аргументах (9, 3)', () => {
        expect(division(9, 3)).toBe(3);
    });

    it('должна возвращать null при аргументах (null, 2)', () => {
        expect(division(null, 2)).toBeNull();
    })

    it('должна возвращать null при аргументах (undefined, null)', () => {
        expect(division(undefined, null)).toBeNull();
    })

    it('должна возвращать null при аргументах ("4", "2")', () => {
        expect(division("4", "2")).toBeNull();
    })
});