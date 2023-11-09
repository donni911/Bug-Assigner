import express from "express";
import { validate, projectSchema } from "../middleware/validationProject.js";
const router = express.Router();

import {
  getProjects,
  addProject,
  getProjectsBySlug,
  updateProject,
  deleteProject,
  getProjectBugsById,
} from "../controllers/projectController.js";

router.route("/").get(getProjects).post(validate(projectSchema), addProject);
router
  .route("/:slug")
  .get(getProjectsBySlug)
  .patch(validate(projectSchema), updateProject);
router.route("/:id").delete(deleteProject);

router.route("/:id/bugs").get(getProjectBugsById);

export default router;
