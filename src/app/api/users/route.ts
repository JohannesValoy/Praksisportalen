/** @format */
import { PageResponse, UserPageRequest } from "@/app/_models/pageinition";
import DBclient from "@/knex/config/DBClient";
import { NextRequest } from "next/server";
//FIXME: Does not work
export async function GET(request: NextRequest) {
  const pageRequest = UserPageRequest.fromRequest(request);
  const users = await DBclient.from("users")
    .select("*")
    .whereIn("role", pageRequest.roles)
    .orderBy(pageRequest.sort);
  return Response.json(new PageResponse(pageRequest, users));
}

export async function POST(request: NextRequest) {
  const { firstName, lastName, email, phoneNumber, role } =
    await request.json();

  const newUser = await DBclient.table("users").insert({
    name: firstName + " " + lastName,
    //lastName, //to be implemented in the server
    email,
    password: "123456", //should probably be auto-generated and return to a message to the user with the password
    //phoneNumber, //to be implemented in the server
    role,
  });

  return Response.json(newUser);
}
