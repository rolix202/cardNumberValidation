import { cardFuncValidator } from "../../src/services/cardFuncValidator";

describe("cardFuncValidator", () => {
    it("should validate a correct card", () => {
        expect(cardFuncValidator("4532015112830366")).toBe(true);
    });

    it("should reject invalid card", () => {
        expect(cardFuncValidator("1234567890123456")).toBe(false);
    })
});