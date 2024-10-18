"use server";

import Project from "@/models/Project";
import { UploadImage } from "@/util/CloudinaryConfig";
import { getpublic_id } from "@/util/Constants";
import { connectDB } from "./ConnectDB";
async function GetProjects(user_email) {
  try {
    await connectDB();
    let Projects = await Project.find({ user_email: user_email });
    Projects = JSON.parse(JSON.stringify(Projects));
    return Projects;
  } catch (error) {
    return { error: "Failed To Fetch The Projects" };
  }
}
async function GetProjectByProjectID(Project_id) {
  try {
    await connectDB();
    let MyProject = await Project.findOne({ _id: Project_id });
    MyProject = JSON.parse(JSON.stringify(MyProject));
    return MyProject;
  } catch (error) {
    return { error: "Failed To Fetch The Project" };
  }
}
async function AddProject(
  user_email,
  project_name,
  project_description,
  project_image,
  ProjectLink
) {
  if (!ProjectLink) {
    ProjectLink = null;
  }
  try {
    await connectDB();
    project_image = project_image.get("ProjectPicture");
    project_image = await UploadImage(project_image, user_email);

    project_image = project_image.secure_url
      .split("upload/")
      .join("upload/f_auto,q_auto/");
    let NewProject = new Project({
      user_email,
      project_name,
      project_description,
      project_image,
      ProjectLink,
    });
    await NewProject.save();
    NewProject = JSON.parse(JSON.stringify(NewProject));
    return NewProject;
  } catch (error) {
    return { error: "Failed To Add The Project" };
  }
}
async function EditProject(
  Project_id,
  project_name,
  project_description,
  project_image,
  ProjectLink
) {
  if (!ProjectLink || ProjectLink.length === 0) {
    ProjectLink = null;
  }
  try {
    await connectDB();
    let ProjectData = await Project.findOne({ _id: Project_id });
    if (!ProjectData) {
      return { error: "Project Not Founded" };
    }
    if (project_image) {
      await getpublic_id(ProjectData.project_image);
      const ImageUploadResult = await UploadImage(
        project_image.get("ProjectPicture"),
        ProjectData.user_email
      );

      project_image = ImageUploadResult.secure_url
        .split("upload/")
        .join("upload/f_auto,q_auto/");

      await Project.findByIdAndUpdate(Project_id, {
        project_name,
        project_description,
        project_image,
        ProjectLink,
      });
      return { success: "Project Updated Successfully" };
    }
    await Project.findByIdAndUpdate(Project_id, {
      project_name,
      project_description,
      ProjectLink,
    });
    return { success: "Project Updated Successfully" };
  } catch (error) {
    console.log(error);

    return { error: "Failed To Update The Project" };
  }
}
async function DeleteProject(Project_id) {
  try {
    await connectDB();
    let ProjectData = await Project.findOne({ _id: Project_id });
    if (!ProjectData) {
      return { error: "Project Not Founded" };
    }
    await getpublic_id(ProjectData.project_image);
    await Project.findByIdAndDelete(Project_id);
    return { success: "Project Deleted Successfully" };
  } catch (error) {
    console.log(error);

    return { error: "Failed To Delete The Project" };
  }
}
export {
  GetProjects,
  AddProject,
  EditProject,
  DeleteProject,
  GetProjectByProjectID,
};
