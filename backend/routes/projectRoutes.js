import express from "express";
import { projectSchema, validate } from "../helpers/validation.js";

const router = express.Router();

import {
  getProjects,
  addProject,
  getProjectsBySlug,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

router.route("/").get(getProjects).post(validate(projectSchema), addProject);
router.route("/:slug").get(getProjectsBySlug).patch(updateProject);
router.route("/:id").delete(deleteProject);

export default router;
