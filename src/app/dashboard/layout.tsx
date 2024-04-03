"use client";
import { useEffect, useState } from "react";
import { checkUserRole } from "@/lib/auth";
import AdminLayout from "./@admin/page";
import CoordinatorLayout from "./@coordinator/page";
import EmployeeLayout from "./@employee/page";
import StudentLayout from "./@student/page";

export default function App() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    async function fetchRole() {
      const userRole = await checkUserRole();
      setRole(userRole);
    }

    fetchRole();
  }, []);

  if (role === "admin") {
    return <AdminLayout />;
  } else if (role === "coordinator") {
    return <CoordinatorLayout />;
  } else if (role === "employee") {
    return <EmployeeLayout />;
  } else if (role === "student") {
    return <StudentLayout />;
  } else {
    return null; // or some kind of default layout or loading state
  }
}
