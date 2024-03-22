/** @format */

import DBclient from "@/knex/config/DBClient";
import ListOfDepartments from "../components/listOfDepartments";

/** @format */
export default async function Page() {
  const departments = await DBclient.from("departments").select("*");
  return (
    <main>
      <h1>Departments</h1>
      <ListOfDepartments />
    </main>
  );
}
