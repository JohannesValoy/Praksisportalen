/** @format */

import Link from "next/link";
export default async function Page() {
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
      <Link href="/admin/administerInternships" className="btn">
        Administrer Internships
      </Link>
      <Link href="/admin/administerInternshipAgreements" className="btn">
        Administrer Internship Agreements
      </Link>
      <Link href="/admin/administerEducationInstitutions" className="btn">
        Administrer Utdanningsinstitusjoner
      </Link>
    </div>
  );
}
