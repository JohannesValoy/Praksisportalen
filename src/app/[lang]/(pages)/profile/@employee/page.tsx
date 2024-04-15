'use client'
export default function Page() {

  return (
    <div className="flex flex-row w-full h-full items-center justify-center">
      {employee ? (
        <div className="flex flex-row gap-20 w-full h-full items-center justify-center p-10 ">
          <div className="flex flex-col gap-5 items-center justify-center">
            <div
              style={{
                width: "15rem",
                height: "15rem",
                overflow: "hidden",
                borderRadius: "50%",
              }}
            >
              <div className="mask mask-squircle w-full h-full overflow-hidden">
                <Image
                  src="/example-profile-picture.jpg"
                  alt="Description"
                  className=" bg-neutral-300 h-full object-cover"
                  width={400}
                  height={400}
                  priority={true} // {false} | {true}
                />
              </div>
            </div>
            <h1>{employee.name}</h1>
            <p>ID: {employee.id}</p>
            <p>Email: {employee.email}</p>
            <ul className="text-center">
              List of sections
              <li>Not yet implemented</li>
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading Profile details...</p>
      )}
    </div>
  );
}
