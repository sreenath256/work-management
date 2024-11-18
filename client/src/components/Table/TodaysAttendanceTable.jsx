import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import React, { useState } from "react";
import { useEffect } from "react";
import { FaCalendarAlt, FaCheckCircle, FaClock, FaUser } from "react-icons/fa";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

const TodaysAttendanceTable = ({ staffData }) => {
  const [date, setDate] = useState("");
  const [selectDate, setSelectDate] = useState("");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  useEffect(() => {
    const today = new Date();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const year = today.getFullYear(); // Get the year
    const monthName = monthNames[today.getMonth()]; // Get month name
    const date = today.getDate(); // Get the date
    setDate(`${date} ${monthName} ${year}`);
  }, []);

  const formatTime = (timestamp) => {
    if (!timestamp) return "Not Punched Out";
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "active":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatWorkingHours = (workingHours) => {
    if (workingHours === null) {
      return "Not Punched Out";
    }

    const hours = Math.floor(workingHours);
    const minutes = Math.round((workingHours - hours) * 60);
    return `${hours}h ${minutes}m`;
  };

  const toggleDatePicker = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  console.log(staffData);

  return (
    <div>
      <div className="p-6 border-b border-gray-200">
        <div
          className="flex items-center gap-2 text-xl justify-center font-semibold text-gray-800"
s        >
          {/* <FaUser  /> */}

          <FaRegCalendarCheck className="w-6 h-6" />
          {date}
        </div>
      </div>
      {/* Conditionally render DatePicker */}
      

      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 ">
              <tr>
                <th className="p-4 text-left font-medium text-gray-500">
                  Name
                </th>
                <th className="p-4 text-left font-medium text-gray-500">
                  Punch In
                </th>
                <th className="p-4 text-left font-medium text-gray-500">
                  Punch Out
                </th>
                <th className="p-4 text-left font-medium text-gray-500">
                  Active Hours
                </th>
                <th className="p-4 text-left font-medium text-gray-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {staffData.map((staff, index) => (
                <tr className="hover:bg-gray-50 transition-colors" key={index}>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`${staff.userId}`}
                        className="flex items-center gap-2"
                      >
                        <img
                          src={staff.profilePhotoURL}
                          className="w-10 h-10 rounded-[50%] text-gray-400"
                        />
                        <span className="font-medium capitalize">
                          {staff.userName}
                        </span>
                      </Link>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <FaClock className="w-4 h-4 text-gray-400" />
                      {formatTime(staff.punchInTime)}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <FaClock className="w-4 h-4 text-gray-400" />
                      {formatTime(staff.punchOutTime)}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <FaClock className="w-4 h-4 text-gray-400" />
                      {formatWorkingHours(staff.workingHours)}
                    </div>
                  </td>

                  <td className="p-4">
                    <div
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${getStatusColor(
                        staff.status
                      )}`}
                    >
                      <FaCheckCircle className="w-4 h-4" />
                      {staff.status.charAt(0).toUpperCase() +
                        staff.status.slice(1)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TodaysAttendanceTable;
