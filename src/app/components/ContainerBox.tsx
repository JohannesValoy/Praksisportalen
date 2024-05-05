/**
 * ContainerBox Component
 * @param root The root object.
 * @param root.children The children of the container box.
 * @param  root.title The title of the container box.
 * @param  root.className The class name of the container box.
 * @returns The ContainerBox component.
 */
const ContainerBox = ({ children, title = "", className = "" }) => {
  return (
    <div className={`flex flex-col w-fit p-5 ${className}`}>
      {title && <h1>{title}</h1>}
      <div className="flex flex-col w-full h-full justify-center items-center bg-neutral text-neutral-content p-5 rounded-2xl gap-5">
        {children}
      </div>
    </div>
  );
};

export default ContainerBox;
