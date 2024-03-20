/** @format */

import React from "react";
import prisma from "../module/prismaClient";

const ListOfDepartments = async () => {
  const departments = await prisma.department.findMany();
  const leader = await prisma.leader.findMany({
    where: {
      id: {
        in: departments.map((department) => department.leaderID),
      },
    },
  });

  return (
    <div>
      <div className="flex justify-center mt-4">
        <div className="overflow-x-auto w-full p-4">
          <h1 className="text-3xl font-semibold">List of Departments</h1>
          <table className="table my-4">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            {departments.map((department, index) => (
              <tbody key={index}>
                <tr>
                  {/* <th>
                                      <label>
                                          <input type="checkbox" className="checkbox" />
                                      </label>
                                  </th> */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">{department?.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {
                      leader.filter((l) => l.id === department.leaderID)[0]
                        ?.email
                    }
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {department?.id}
                    </span>
                  </td>
                  <td>{department?.id}</td>
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
