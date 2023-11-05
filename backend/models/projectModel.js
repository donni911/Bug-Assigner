import mongoose from "mongoose";

const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: { type: String, required: true, trim: true },
    technologies: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
