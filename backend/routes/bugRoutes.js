import express from "express";

const router = express.Router();

import {
  getBugById,
  getBugs,
  addBug,
  updateBug,
} from "../controllers/bugController.js";

router.route("/").get(getBugs).post(addBug);
router.route("/:id").get(getBugById).patch(updateBug);

export default router;
