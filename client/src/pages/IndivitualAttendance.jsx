import React, { useState } from "react";
import { FaUser, FaClock, FaCalendarAlt } from "react-icons/fa";
import { BiTime } from "react-icons/bi";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import baseURL from "../api/baseURL";
import Loader from "../components/Loader/Loader";

const IndivitualAttendance = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [user, setUser] = useState();
  const [attendanceData, setAttendanceData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("Select a date range");

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await baseURL.get(`/user/getSingleUser/${id}`);

        setUser(res.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await baseURL.post(
        `/attendance/getUserAttendanceReport/${id}`,
        { startDate, endDate }
      );
      console.log(res.data.data.records);
      setAttendanceData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
      setMessage("No data for this specific date");
    }

    // Replace with your actual API call
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  return (
    <div className="mt-20 mr-1 mb-1 p-5 w-full h-[calc(100vh-5.75rem)] overflow-y-hidden">
      <div className="max-w-7xl mx-auto p-6">
        {/* User Profile Section */}
        <div className="flex items-center mb-8 bg-white p-4 rounded-lg shadow">
          <div className="relative">
            <img
              src={user?.profilePhotoURL ?? "/avatar-icon.jpg"}
              alt="Profile"
              className="w-16 h-16 rounded-full"
            />
            <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              {user?.userName}
            </h2>
            <p className="text-gray-500">Email: {user?.email}</p>
          </div>
        </div>

        {/* Date Selection Form */}
        <form
          onSubmit={handleSubmit}
          className="mb-8 bg-white p-4 rounded-lg shadow"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-2 text-gray-700 flex items-center">
                <FaCalendarAlt className="mr-2" />
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-maingreen"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-gray-700 flex items-center">
                <FaCalendarAlt className="mr-2" />
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-maingreen"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-maingreen text-black px-6 py-2 rounded-md hover:bg-maingreenhvr transition-colors"
          >
            Generate Report
          </button>
        </form>

        {/* Summary Cards
        {attendanceData && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Present Days</p>
                  <p className="text-2xl font-semibold">
                    {attendanceData.data.summary.totalDaysPresent}
                  </p>
                </div>
                <FaUser className="text-maingreen text-2xl" />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Working Days</p>
                  <p className="text-2xl font-semibold">
                    {attendanceData.data.summary.totalWorkingDays}
                  </p>
                </div>
                <FaClock className="text-green-500 text-2xl" />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Attendance</p>
                  <p className="text-2xl font-semibold">
                    {attendanceData.data.summary.attendancePercentage}%
                  </p>
                </div>
                <BiTime className="text-yellow-500 text-2xl" />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Avg Hours</p>
                  <p className="text-2xl font-semibold">
                    {attendanceData.data.summary.averageWorkingHours.toFixed(2)}
                  </p>
                </div>
                <FaClock className="text-purple-500 text-2xl" />
              </div>
            </div>
          </div>
        )} */}

        {/* Attendance Records Table */}

        {isLoading ? (
          <Loader />
        ) : attendanceData ? (
          <div className="bg-white rounded-lg shadow overflow-scroll">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Punch In
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Punch Out
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Working Hours
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {attendanceData.data.records.map((record, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(record.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDateTime(record.punchInTime)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDateTime(record.punchOutTime)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.workingHours
                          ? `${record.workingHours} hrs`
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <h1 className="text-2xl text-white">{message}</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndivitualAttendance;
