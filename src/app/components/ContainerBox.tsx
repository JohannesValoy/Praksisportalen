/** @format */

const ContainerBox = ({ children, title }) => {
  return (
    <div className="flex flex-col w-full h-full min-h-fit p-10">
      <h1>{title}</h1>
      <div className="border border-base-100 flex flex-col justify-center items-center w-full h-full min-h-fit bg-base-300 p-5 rounded-2xl gap-5">
        {children}
      </div>
    </div>
  );
};

export default ContainerBox;
