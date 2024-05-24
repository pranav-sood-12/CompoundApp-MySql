import express from 'express'

import { addCompound, getAllCompound, getCompound, updatedCompound } from '../controllers/compoundControllers.js';

const router = express.Router();

router.post("/new",addCompound);
router.get("/info/:id",getCompound);
router.get("/",getAllCompound)
router.put("/update/:id",updatedCompound)

export default router;