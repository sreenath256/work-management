import React, { useState } from "react";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlinePeopleOutline,
} from "react-icons/md";
import { getAllProjects } from "../../api/apiConnections/projectConnections";
import {
  allProjectsAtom,
  currentProjectNameAtom,
} from "../../recoil/atoms/projectAtoms";
import { useRecoilState } from "recoil";
import { useNavigate, useLocation } from "react-router-dom";
import { TbLayoutDashboard } from "react-icons/tb";
import { BsPersonWorkspace } from "react-icons/bs";
import { MdOutlineToday } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoFingerPrint } from "react-icons/io5";

const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [openProjects, setOpenProjects] = useState(false);
  const [projects, setProjects] = useRecoilState(allProjectsAtom);
  const [projectName, setProjectName] = useRecoilState(currentProjectNameAtom);

  const getProjects = async () => {
    setOpenProjects(!openProjects);
    if (!openProjects) {
      const response = await getAllProjects();
      if (response?.status) {
        setProjects(response.data);
      }
    }
  };

  const navigation = (path, data = {}) => {
    switch (path) {
      case "/projects":
        setProjectName(data.name);
        navigate(path, {
          state: {
            id: data._id,
            name: data.name,
          },
        });
        break;
      default:
        setProjectName("");
        navigate(path);
        break;
    }
  };

  return (
    <div
      style={{
        width: isOpen ? "12rem" : "3.5rem", // Smooth width transition
        transition: "width 0.3s ease-in-out", // CSS transition for smoothness
      }}
      className="text-gray-800 bg-[#ffffffcd] max-h-screen mt-16 border-r-4 relative selection:bg-transparent"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="bg-gray-200 hover:bg-gray-300 p-1 absolute -right-8 top-0"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-xl transition-transform duration-300">
          {isOpen ? <MdKeyboardArrowLeft /> : <MdKeyboardArrowRight />}
        </div>
      </button>
      <nav>
        <ul className="cursor-pointer font-medium flex flex-col gap-6 pt-5 pl-1">
        <li
            onClick={() => navigation("/")}
            className={`hover:text-black hover:bg-[#aefe007e] text-nowrap flex gap-3 px-2 p-1 rounded-md fixed mt-[00px] ${
              pathname === "/" &&
              "text-black bg-maingreen hover:bg-maingreenhvr"
            }`}
          >
            <TbLayoutDashboard size={25} />
            {isOpen && "Dashboard"}
          </li>
          <li
            onClick={() => navigation("/my-works")}
            className={`hover:text-black hover:bg-[#aefe007e] text-nowrap flex gap-3 px-2 p-1 rounded-md fixed mt-[50px] ${
              pathname === "/my-works" &&
              "text-black bg-maingreen hover:bg-maingreenhvr"
            }`}
          >
            <BsPersonWorkspace size={25} />
            {isOpen && "My Works"}
          </li>
          <li
            onClick={() => navigation("/today-works")}
            className={`hover:text-black hover:bg-[#aefe007e] text-nowrap flex gap-3 px-2 p-1 rounded-md fixed mt-[100px] ${
              pathname === "/today-works" &&
              "text-black bg-maingreen hover:bg-maingreenhvr"
            }`}
          >
            <MdOutlineToday size={25} />
            {isOpen && "Today Works"}
          </li>

         
          
          <li
            onClick={() => navigation("/clients")}
            className={`hover:text-black hover:bg-[#aefe007e] gap-3 flex px-2 p-1 rounded-md fixed mt-[150px] ${
              pathname === "/clients" &&
              "text-black bg-maingreen hover:bg-maingreenhvr"
            }`}
          >
            <MdOutlinePeopleOutline size={25} />
            {isOpen && "Clients"}
          </li>
          <li
            onClick={() => navigation("/attendance")}
            className={`hover:text-black hover:bg-[#aefe007e] flex gap-3 px-2 p-1 rounded-md fixed mt-[200px] ${
              pathname === "/attendance" &&
              "text-black bg-maingreen hover:bg-maingreenhvr"
            }`}
          >
            <IoFingerPrint size={25} />
            {isOpen && "Attendance"}
          </li>
          <li
            onClick={getProjects}
            className={`hover:text-black hover:bg-[#aefe007e] flex gap-3 px-2 p-1 rounded-md  fixed mt-[250px] ${
              pathname === "/projects" &&
              "text-black bg-maingreen hover:bg-maingreenhvr"
            }`}
          >
            <FaRegCalendarAlt size={25} />
            {isOpen && "Projects"}
            {openProjects && projects.length ? (
              <div className="absolute w-1 h-3 left-2 -bottom-2 border-l border-black"></div>
            ) : null}
          </li>

          {openProjects && isOpen && (
            <div className="max-h-96 overflow-y-scroll no-scrollbar">
              <div className="ml-4 w-20">
                {projects?.map((singleProject) => (
                  <div key={singleProject._id} className="relative">
                    <div className="absolute -left-2 -top-3 rounded-b-lg w-1.5 h-6 border-b border-l border-black"></div>
                    <p
                      className={`capitalize whitespace-nowrap overflow-ellipsis text-sm hover:text-black ${
                        projectName === singleProject.name && "text-black"
                      }`}
                      onClick={() => navigation("/projects", singleProject)}
                    >
                      {singleProject.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
