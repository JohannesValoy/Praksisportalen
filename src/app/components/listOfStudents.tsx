/** @format */
/** @format */

import React from "react";
import prisma from "../module/prismaClient";

const ListOfDepartments = async () => {
  const users = await prisma.candidate.findMany();
  return (
    <div>
      <div className="flex justify-center mt-4">
        <div className="overflow-x-auto w-full p-4">
          <h1 className="text-3xl font-semibold">List of Users</h1>
          <table className="table my-4">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            {users.map((user, index) => (
              <tbody key={index}>
                <tr>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            //imports Example profile picture
                            src="Example-profile-picture.jpg"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user?.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {user?.email}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {user?.id}
                    </span>
                  </td>
                  <td>{user?.createdAt?.getDate()?.toString()}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListOfDepartments;
