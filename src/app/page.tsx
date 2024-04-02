/** @format */
"use client";
import Link from "next/link";
import ThemeChanger from "./components/ThemeChanger";

/**With dummy buttons to log into the different users while backend is being developed */
export default function Home() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center gap-5 h-full">
      <Link href="/student" className="btn">
        Logg in as Student
      </Link>
      <Link href="/coordinator" className="btn">
        Logg in as Coordinator
      </Link>
      <button
        onClick={() => {
          window.location.href = `/admin/administerSections/?department_id=${1}`;
        }}
        className="btn"
      >
        Employee
      </button>
      <Link href="/admin" className="btn">
        Logg in as Administrator
      </Link>
    </div>
  );
}
