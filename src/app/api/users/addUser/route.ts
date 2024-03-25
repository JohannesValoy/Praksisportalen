/** @format */

import DBclient from "@/knex/config/DBClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { firstName, lastName, email, phoneNumber, role } =
    await request.json();

  const newUser = await DBclient.table("users").insert({
    name: firstName + " " + lastName,
    email,
    password: "123456", //should probably be auto-generated and return to a message to the user with the password
    //lastName, //to be implemented in the server
    //phoneNumber, //to be implemented in the server
    role,
  });

  return NextResponse.json(newUser);
}
