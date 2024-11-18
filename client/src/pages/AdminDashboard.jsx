import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaClock,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaCircle,
} from "react-icons/fa";
import AttendanceSummary from "../components/Attendance/AttendanceSummary";
import baseURL from "../api/baseURL";
import TodaysAttendanceTable from "../components/Table/TodaysAttendanceTable";

const AdminDashboard = () => {
  const [staffData, setStaffData] = useState([]);

  const fetchTodaysAttendance = async () => {
    try {
      const res = await baseURL.get("/attendance/getTodayAttendance");
      setStaffData(res.data.data.records);
      console.log(res.data.data.records);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  useEffect(() => {
    fetchTodaysAttendance();
  }, []);

  // Sample data - replace this with your actual data

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-lg">
      {/* <AttendanceSummary /> */}

      <TodaysAttendanceTable staffData={staffData} />
    </div>
  );
};

export default AdminDashboard;






