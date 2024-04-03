/** @format */

import Link from "next/link";

const AdminLayout = () => {
  return (
    <div className="container mx-auto flex flex-row items-start justify-center mt-20 space-x-4">
      <Link href="./studyPrograms" className="btn">
        Administrer Studier
      </Link>
      <Link href="/administerCoordinators" className="btn">
        Administrer Kordinatorer
      </Link>
      <Link href="/administerEmployees" className="btn">
        Administrer Ansatte
      </Link>
      <Link href="./departments" className="btn">
        Administrer Avdelinger
      </Link>
      <Link href="./sections" className="btn">
        Administrer Seksjoner
      </Link>
      <Link href="/internships" className="btn">
        Administrer Internships
      </Link>
      <Link href="/internshipAgreements" className="btn">
        Administrer Internship Agreements
      </Link>
      <Link href="/educationInstitutions" className="btn">
        Administrer Utdanningsinstitusjoner
      </Link>
    </div>
  );
};

export default AdminLayout;
