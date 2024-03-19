import Link from "next/link";

// `app/page.tsx` is the UI for the `/` URL
export default function Page() {
  return (
    <>
      <h1>Hello, Employee home page!</h1>
      <main className="container mx-auto flex flex-row items-start justify-center mt-20 space-x-4">
        <Link
          href="/department"
          className="inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Go to Departments
        </Link>
      </main>
    </>
  );
}
