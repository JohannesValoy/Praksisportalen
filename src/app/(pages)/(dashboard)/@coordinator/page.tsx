/** @format */

// `app/page.tsx` is the UI for the `/` URL

import Link from "next/link";

const CoordinatorLayout = () => {
  return (
    <div className="container mx-auto flex flex-row items-start justify-center mt-20 space-x-4">
      <Link href="./internship/orderInternships" className="btn">
        Order Internships
      </Link>
      <Link href="./users/administerStudents" className="btn">
        Administer Students
      </Link>
    </div>
  );
};

export default CoordinatorLayout;
