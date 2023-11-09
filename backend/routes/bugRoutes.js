import express from "express";

const router = express.Router();

import {
  getBugById,
  getBugs,
  addBug,
  updateBug,
  deleteBug,
} from "../controllers/bugController.js";
import { validate, bugSchema } from "../middleware/validationBugs.js";

router.route("/").get(getBugs).post(validate(bugSchema), addBug);
router
  .route("/:id")
  .get(getBugById)
  .patch(validate(bugSchema), updateBug)
  .delete(deleteBug);

export default router;
