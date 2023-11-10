import express from "express";
import { bugSchema } from "../middleware/validationBugs.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

import {
  getBugById,
  getBugs,
  addBug,
  updateBug,
  deleteBug,
  checkId,
} from "../controllers/bugController.js";

router.param("id", checkId);

router.route("/").get(getBugs).post(validate(bugSchema), addBug);
router
  .route("/:id")
  .get(getBugById)
  .patch(validate(bugSchema), updateBug)
  .delete(deleteBug);

export default router;
