import { Router } from "express";
import { postCardController } from "../controllers/card.controllers";
import { validateCardNumber } from "../middleware/card.validation";

const router = Router();

router.post('/validate', validateCardNumber, postCardController)


export default router;