/** @format */

// `app/page.tsx` is the UI for the `/` URL

import Link from "next/link";

export default function Page() {
  return (
    <div className="container mx-auto flex flex-row items-start justify-center mt-20 space-x-4">
      <Link href="/coordinator/orderInternships" className="btn">
        Order Internships
      </Link>
      <Link href="/coordinator/administerStudents" className="btn">
        Administer Students
      </Link>
    </div>
  );
}
