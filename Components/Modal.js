import {
  AddProject,
  GetProjectByProjectID,
  EditProject,
  GetProjects,
} from "@/server/HandleProjects";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import MyLoader from "./MyLoader";
const Modal = ({ Hidden, Closemodal, projectid, setProjects }) => {
  const { data } = useSession();
  const [Loading, setLoading] = useState(false);
  const [FormDetails, setFormDetails] = useState({
    ProjectDesc: "",
    ProjectName: "",
    ProjectLink: "",
    ProjectPicture: null,
  });
  async function Handlesubmit(e) {
    e.preventDefault();
    setLoading(true);
    const ProjectDesc = e.target.ProjectDesc.value;
    const ProjectName = e.target.ProjectName.value;
    const ProjectLink = e.target.ProjectLink.value;
    const ProjectPicture = e.target.ProjectPicture.files[0];
    if (ProjectLink.length > 0 && !ProjectLink.includes("http")) {
      toast.error("Please enter a valid URL");
      setLoading(false);
      return;
    }
    let ProjectImage = new FormData();
    ProjectImage.append("ProjectPicture", ProjectPicture);
    let ProductAddResponse;
    if (!projectid) {
      ProductAddResponse = await AddProject(
        data.user.email,
        ProjectName,
        ProjectDesc,
        ProjectImage,
        ProjectLink
      );
    } else {
      ProductAddResponse = await EditProject(
        projectid,
        ProjectName,
        ProjectDesc,
        ProjectImage,
        ProjectLink
      );
    }
    if (ProductAddResponse.error) {
      toast.error(ProductAddResponse.error);
      setLoading(false);
    } else {
      toast.success(
        ProductAddResponse.success
          ? ProductAddResponse.success
          : "Project Added Successfully"
      );
      const NewProducts = await GetProjects(data.user.email);
      await setProjects([...NewProducts]);
      setLoading(false);
      Closemodal(false);
    }
  }
  function HandleChange(e) {
    setFormDetails({ ...FormDetails, [e.target.name]: e.target.value });
  }
  async function GetProjectDetails() {
    let ProjectDetails = await GetProjectByProjectID(projectid);
    setFormDetails({
      ...FormDetails,
      ProjectName: ProjectDetails.project_name,
      ProjectDesc: ProjectDetails.project_description,
      ProjectLink: ProjectDetails.ProjectLink,
    });
  }
  useEffect(() => {
    if (projectid) {
      GetProjectDetails();
    } else {
      setFormDetails({
        ...FormDetails,
        ProjectDesc: "",
        ProjectName: "",
        ProjectLink: "",
        ProjectPicture: null,
      });
    }
  }, [projectid]);

  return (
    <div
      id="authentication-modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`${
        !Hidden ? "hidden" : "block"
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 md:left-[40%] z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white ">
              {projectid ? "Update" : "Add"} Your Project
            </h3>
            <button
              onClick={() => {
                Closemodal(false);
              }}
            >
              <X />
            </button>
          </div>
          <div className="p-4 md:p-5">
            <form className="space-y-4" onSubmit={Handlesubmit}>
              <div>
                <label
                  htmlFor="ProjectPicture"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                  Project Picture
                </label>
                <input
                  type="file"
                  name="ProjectPicture"
                  id="ProjectPicture"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="E-Commerce Store - A MERN Stack Project"
                  required={projectid ? false : true}
                />
              </div>
              <div>
                <label
                  htmlFor="ProjectLink"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                  Project Link
                </label>
                <input
                  type="text"
                  name="ProjectLink"
                  id="ProjectLink"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="https://get-me-a-chai-pritamstech.vercel.app"
                  value={FormDetails.ProjectLink}
                  onChange={HandleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="ProjectName"
                  className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                >
                  Project Name
                </label>
                <input
                  type="ProjectName"
                  name="ProjectName"
                  id="ProjectName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="E-Commerce Store - A MERN Stack Project"
                  required
                  value={FormDetails.ProjectName}
                  onChange={HandleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="ProjectDesc"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Project Description
                </label>
                <textarea
                  type="text"
                  name="ProjectDesc"
                  id="ProjectDesc"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  rows={5}
                  required
                  onChange={HandleChange}
                  value={FormDetails.ProjectDesc}
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {Loading ? (
                  <MyLoader />
                ) : projectid ? (
                  "Update Project"
                ) : (
                  "Add Project"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
