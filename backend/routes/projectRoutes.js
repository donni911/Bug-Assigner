import express from "express";
import { validate } from "../middleware/validation.js";
const router = express.Router();

import {
  getProjects,
  addProject,
  getProjectsBySlug,
  updateProject,
  deleteProject,
  projectSchema,
} from "../controllers/projectController.js";

router.route("/").get(getProjects).post(validate(projectSchema), addProject);
router
  .route("/:slug")
  .get(getProjectsBySlug)
  .patch(validate(projectSchema), updateProject);
router.route("/:id").delete(deleteProject);

export default router;
