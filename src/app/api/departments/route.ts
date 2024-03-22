import DBclient from "@/knex/config/DBClient";

export async function GET(request: Request) {
  const departments = await DBclient.from("departments").select("*");
  return Response.json(departments);
}
