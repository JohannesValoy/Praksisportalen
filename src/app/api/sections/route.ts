import DBclient from "@/knex/config/DBClient";

export async function GET(request: Request) {
  const sections = await DBclient.from("sections").select("*");
  return Response.json(sections);
}
