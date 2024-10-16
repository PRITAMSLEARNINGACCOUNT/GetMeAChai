import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    user_email: {
      type: String,
      required: true,
    },
    project_name: {
      type: String,
      required: true,
    },
    project_description: {
      type: String,
      required: true,
    },
    ProjectLink: {
      type: String,
      default: null,
    },
    project_image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
