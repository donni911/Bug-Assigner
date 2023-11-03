import mongoose from "mongoose";
import slug from "mongoose-slug-generator";

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  slug: {
    type: String,
    slug: "title",
  },
  title: {
    type: String,
    required: true,
  },
  description: { type: String, required: true, trim: true },
  technologies: {
    type: Array,
  },

});

const Project = mongoose.model("Project", projectSchema);

export default Project;
