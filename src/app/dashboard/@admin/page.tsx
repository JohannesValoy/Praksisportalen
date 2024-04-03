/** @format */

import Link from "next/link";

const AdminLayout = () => {
  return (
    <div className="container mx-auto flex flex-row items-start justify-center mt-20 space-x-4">
      <Link href="/dashboard/administerStudies" className="btn">
        Administrer Studier
      </Link>
      <Link href="/dashboard/administerCoordinators" className="btn">
        Administrer Kordinatorer
      </Link>
      <Link href="/dashboard/administerEmployees" className="btn">
        Administrer Ansatte
      </Link>
      <Link href="/dashboard/administerDepartments" className="btn">
        Administrer Avdelinger
      </Link>
      <Link href="/dashboard/administerSections" className="btn">
        Administrer Seksjoner
      </Link>
    </div>
  );
};

export default AdminLayout;
