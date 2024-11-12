import React, { useEffect, useState } from "react";
import baseURL from "../../api/baseURL";

const TodayTaskTable = ({ task }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState([]);
  const { personId, tasks } = task;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await baseURL.get(`/user/getSingleUser/${personId}`);
        console.log(res.data);

        setUser(res.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-500 text-white";
      case "normal":
        return "bg-blue-500 text-white";
      case "low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500 text-white";
      case "in progress":
        return "bg-yellow-500 text-white";
      case "not started":
        return "bg-gray-400 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  return (
    <>
      {tasks.length !== 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <img
              src={user.profilePhotoURL}
              alt={user.userName}
              className="w-10 h-10 rounded-full mr-3"
            />
            <h1 className="text-xl font-bold">{user.userName}</h1>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full rounded-lg overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Task
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Priority
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tasks.map((task) => (
                  <tr key={task._id} className="hover:bg-gray-100">
                    <td
                      className={`px-4 py-3 whitespace-nowrap font-medium text-gray-900`}
                    >
                      {task.task}
                    </td>
                    <td
                      className={`px-4 py-3 whitespace-nowrap ${getStatusColor(
                        task.status
                      )}`}
                    >
                      {task.status}
                    </td>
                    <td
                      className={`px-4 py-3 whitespace-nowrap ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      {task.priority}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default TodayTaskTable;
