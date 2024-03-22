import DBclient from "@/knex/config/DBClient";
import UserJson from "../UserView";

export async function GET(request: Request, { params }: { params: { id: number}}) {
  const user = await DBclient("users").where({ id: params.id }).first();
  if (user) {
    return Response.json(new UserJson(user));
  }
  return Response.json({ message: "User not found" }, { status: 404 });
};
