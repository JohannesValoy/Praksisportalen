import DBclient from "@/knex/config/DBClient";

/** @format */
export default async function Page() {
  const departments = await DBclient.from("departments").select("*");
  return (
    <main>
      <h1>Departments</h1>
      <ul>
        {departments.map((department) => (
          <li key={department.id}>{department.name}</li>
        ))}
      </ul>
    </main>
  );
}
