import Project from "../models/projectModel.js";
import { slugStr } from "../utils/slug.js";

import { z } from "zod";

export const projectSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Must be 5 or more characters long" })
    .max(30, { message: "Must be maximum of 30 characters long." }),
  description: z
    .string()
    .min(30, { message: "Must be 30 or more characters long" }),
  technologies:  z.string().array().min(2),
});

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    res.status(200).json({ data: projects });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: "Cannot fetch data",
    });
  }
};

export const getProjectsBySlug = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });

    if (!project) {
      throw new Error("project not found");
    }

    res.status(200).json({ data: project });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: `Cannot find project with id: ${req.params.id}`,
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { slug: req.params.slug },
      { ...req.body },
      {
        new: true,
      }
    );

    res.status(200).json({ data: { project } });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: `Cannot update project with id: ${req.params.id}`,
    });
  }
};

export const addProject = async (req, res) => {
  try {
    const slug = await slugStr(req.body.title);

    const project = new Project({
      slug,
      ...req.body,
    });

    await project.save();

    res.status(201).json(project);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "failed",
      message: error,
    });
  }
};

export const deleteProject = async (req, res) => {
  //Yor code here
  try {
    await Project.deleteOne({
      _id: req.params.id,
    });

    res.status(200).json({
      status: "success",
      message: `The project with id: ${req.params.id}, was deleted succesfully`,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "cannot delete product",
    });
  }
};
