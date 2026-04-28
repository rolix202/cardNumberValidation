
import { validateCardNumber } from "../../src/middleware/card.validation"

describe("validateCardumber", () => {
    const mockRes: any = {};
    const mockNext = jest.fn();

    it("should fail if card number is missing", () => {
        const req: any = { body: {} };

        validateCardNumber(req, mockRes, mockNext)

        expect(mockNext).toHaveBeenCalled()
    })

    it("should sanitized input", () => {
        const req: any = { body: { cardNumber: "4242 4242 4242 4242" } }
        validateCardNumber(req, mockRes, mockNext);

        expect(req.body.cardNumber).toBe("4242424242424242")
    })
})
