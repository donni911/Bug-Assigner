import Project from "../models/projectModel.js";

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    res.status(200).json({
      status: "success",
      data: projects,
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: "Cannot fetch data",
    });
  }
};

export const getProjectsById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      throw new Error("project not found");
    }

    res.status(200).json({ status: "success", data: { project } });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: `Cannot find project with id: ${req.params.id}`,
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      {
        new: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        project,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: `Cannot update project with id: ${req.params.id}`,
    });
  }
};

export const addProject = async (req, res) => {
  try {
    if (!req.body.description) {
      throw new Error("Project should contain description!");
    }

    if (!req.body.title) {
      throw new Error("Project should contain title!");
    }

    const project = new Project(req.body);

    await project.save();

    res.status(201).json({
      status: "success",
      data: { project },
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
};
