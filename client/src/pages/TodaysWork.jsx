import React, { useEffect, useState } from "react";
import baseURL from "../api/baseURL";
import { toast } from "react-toastify";
import Loader from "../components/Loader/Loader";
import TodayTaskTable from "../components/Table/TodayTaskTable";

const TodaysWork = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await baseURL.get("/tasks/getProjectByPeople");

        setSelectedProject(res.data.data);
        console.log(res.data.data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full">
      <div className="  overflow-y-scroll h-screen no-scrollbar flex justify-start items-start pt-28  ">
        
        {selectedProject ? (
          selectedProject.map((singleTask, index) => (
            <div key={index} className="flex flex-wrap gap-7 py-5 pl-2  ">
              <TodayTaskTable task={singleTask} />
            </div>
          ))
        ) : (
          <h1>No works for today</h1>
        )}
      </div>
    </div>
  );
};

export default TodaysWork;
