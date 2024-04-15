/** @format */

import { getUser } from "@/lib/auth"

export default function Page({searchparams: {userid}}) {
  if (!userid) {
    const user = await getUser();
  }

  

  return (

  )
}