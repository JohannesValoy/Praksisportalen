/** @format */

import Link from "next/link";

const AdminLayout = () => {
  return (
    <div className="container mx-auto flex flex-row items-start justify-center mt-20 space-x-4">
      <Link href="/admin/administerStudies" className="btn">
        Administrer Studier
      </Link>
      <Link href="/admin/administerCoordinators" className="btn">
        Administrer Kordinatorer
      </Link>
      <Link href="/admin/administerEmployees" className="btn">
        Administrer Ansatte
      </Link>
      <Link href="/admin/administerDepartments" className="btn">
        Administrer Avdelinger
      </Link>
      <Link href="/admin/administerSections" className="btn">
        Administrer Seksjoner
      </Link>
    </div>
  );
};

export default AdminLayout;
