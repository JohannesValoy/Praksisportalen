/** @format */

import DBclient from "@/knex/config/DBClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { firstName, lastName, email, phoneNumber, role } =
    await request.json();

  const newUser = await DBclient.table("users").insert({
    id: 910238,
    name: firstName + " " + lastName,
    email,
    password: "string",
    //lastName,
    //phoneNumber,
    role,
  });

  return NextResponse.json(newUser);
}
