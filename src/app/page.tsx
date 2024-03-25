/** @format */
"use client";
import Link from "next/link";

/**With dummy buttons to log into the different users while backend is being developed */
export default function Home() {
  return (
    <main className="container mx-auto flex flex-col items-center justify-center gap-5 h-full">
      <Link
        href="/student"
        className="inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Logg in as Student
      </Link>
      <Link
        href="/coordinator"
        className="inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Logg in as Coordinator
      </Link>
      <button
        onClick={() => {
          window.location.href = `/admin/administerSections/?department_id=${1}`;
        }}
        className="inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Employee
      </button>
      <Link
        href="/admin"
        className="inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Logg in as Administrator
      </Link>
    </main>
  );
}
