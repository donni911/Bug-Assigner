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

    // role: {
    //   enum: {
    //     values: ["frontend", "backend", "designer", "devops", "project-manager"],
    //     message: "{VALUE} is not supported",
    //   },
    // },

    resolved: {
      type: Boolean,
    },

    userId: {
      type: Number,
    },
  },
  {
    versionKey: false,
  }
);

const Bug = mongoose.model("Bug", bugSchema);

export default Bug;
