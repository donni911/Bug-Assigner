import Bug from "../models/bugModel.js";

export const getBugs = async (req, res) => {
  try {
    const bugs = await Bug.find();

    res.status(200).json({
      status: "success",
      data: bugs,
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: "Cannot fetch data",
    });
  }
};

export const getBugById = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);

    if (!bug) {
      throw new Error("Bug not found");
    }

    res.status(200).json({ status: "success", data: { bug } });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: `Cannot find bug with id: ${req.params.id}`,
    });
  }
};

export const updateBug = async (req, res) => {
  try {
    const bug = await Bug.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      {
        new: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        bug,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: `Cannot update bug with id: ${req.params.id}`,
    });
  }
};

export const addBug = async (req, res) => {
  try {
    if (!req.body.description) {
      throw new Error("Bug should contain description!");
    }

    if (!req.body.title) {
      throw new Error("Bug should contain description!");
    }

    const bug = new Bug(req.body);

    await bug.save();

    res.status(201).json({
      status: "success",
      data: { bug },
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
};

export const deleteBug = async (req, res) => {
  //Yor code here
  try {
    await Bug.deleteOne({
      _id: req.params.id,
    });

    res.status(200).json({
      status: "success",
      message: `The bug with id: ${req.params.id}, was deleted succesfully`,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "cannot delete bug",
    });
  }
};
