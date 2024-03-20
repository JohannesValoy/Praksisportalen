/** @format */

import React from "react";
import prisma from "../module/prismaClient";

const ListOfDepartments = async () => {
  const departments = await prisma.department.findMany();
  return (
    <div>
      <div className="flex justify-center mt-4">
        <div className="overflow-x-auto w-full p-4">
          <h1 className="text-3xl font-semibold">List of Departments</h1>
          {departments.map((department, index) => (
            <div key={index}>
              <table className="table my-4">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
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
                      {department?.leaderID}
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
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListOfDepartments;
