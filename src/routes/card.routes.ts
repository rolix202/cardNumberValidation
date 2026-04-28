import { Router } from "express";
import { postCardController } from "../controllers/card.controllers";

const router = Router();

router.post('/validate', postCardController)


export default router;