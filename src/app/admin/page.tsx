import Link from "next/link";
export default function Page() {
  return (
    <main className="container mx-auto flex flex-row items-start justify-center mt-20 space-x-4">
      <Link
        href="/coordinator/orderInternships"
        className="inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Administrer Studier
      </Link>
      <Link
        href="/coordinator/administerStudents"
        className="inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Administrer Lærere
      </Link>
      <Link
        href="/coordinator/administerStudents"
        className="inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Administrer Ansatte
      </Link>
      <Link
        href="/coordinator/administerStudents"
        className="inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Administrer Avdelinger
      </Link>
    </main>
  );
}
