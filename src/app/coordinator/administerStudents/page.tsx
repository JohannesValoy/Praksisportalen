/** @format */
import React from "react";
import ListOfUsers from "@/app/components/listOfUsers"; // Make sure the path is correct

const Page = () => {
  return (
    <main>
      <ListOfUsers role="student" />
    </main>
  );
};

export default Page;
