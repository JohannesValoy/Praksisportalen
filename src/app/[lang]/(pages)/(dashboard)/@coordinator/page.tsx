import Link from "next/link";
/**
 * A react component for the coordinator Dashboard
 * @returns Dashboard for the coordinator
 */
const CoordinatorLayout = () => {
  return (
    <div className="container mx-auto flex flex-row items-start justify-center mt-20 space-x-4">
      <Link href="./internshipOrders" className="btn btn-primary">
        Order Internships
      </Link>
      <Link href="./users/administerStudents" className="btn btn-primary">
        Administer Students
      </Link>
    </div>
  );
};

export default CoordinatorLayout;
