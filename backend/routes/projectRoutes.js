import express from "express";

const router = express.Router();

import {
  getProjects,
  addProject,
  getProjectsById,
  updateProject,
} from "../controllers/projectController.js";

router.route("/").get(getProjects).post(addProject);
router.route("/:id").get(getProjectsById).patch(updateProject);

export default router;
