import request from "supertest"
import app from "../../src/app"

describe("POST /api/v1/card/validate", () => {
    it("should validate a correct card", async () => {
        const res = await request(app)
            .post("/api/v1/card/validate")
            .send({ cardNumber: "4532015112830366" });

        expect(res.status).toEqual(200);
        expect(res.body.valid).toBe(true);
    });

    it("should reject invalid card", async () => {
        const res = await request(app)
            .post("/api/v1/card/validate")
            .send({ cardNumber: "1234567890123456" });

        expect(res.status).toEqual(400);
    })

    it("should reject bad input", async () => {
        const res = await request(app)
            .post("/api/v1/card/validate")
            .send({ cardNumber: "abcd1234" }); 
        
        expect(res.status).toEqual(400);
    })
})

