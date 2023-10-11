import { add } from "../index.js"

describe('canvas-plus', function () {
    it('add', function () {
        expect(add(1, 2)).toEqual(3)
        expect(add(2, 1)).toEqual(3)
        expect(add(1.5, 1.5)).toEqual(3)
        expect(add(1.2, 1.8)).toEqual(3)
    })
})