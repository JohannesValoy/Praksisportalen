const ContainerBox = ({ children, title = "", className = "" }) => {
  return (
    <div className={`flex flex-col w-1/2 p-10 ${className}`}>
      {title && <h1>{title}</h1>}
      <div className="flex flex-col w-full h-full justify-center items-center bg-neutral text-neutral-content p-5 rounded-2xl gap-5">
        {children}
      </div>
    </div>
  );
};

export default ContainerBox;
