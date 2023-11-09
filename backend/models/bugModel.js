import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bugSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },

    resolved: {
      type: Boolean,
      default: false,
    },

    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
  },
  {
    versionKey: false,
  }
);

const Bug = mongoose.model("Bug", bugSchema);

export default Bug;
