/**
 * ContainerBox Component
 * @param root The root object.
 * @param root.children The children of the container box.
 * @param  root.title The title of the container box.
 * @param  root.className The class name of the container box.
 * @param  root.subClassName The sub class name of the container box.
 * @returns The ContainerBox component.
 */
const ContainerBox = ({
  children,
  title = "",
  className = "",
  subClassName = "flex-col",
}) => {
  return (
    <div className={`flex flex-col w-fit p-5 ${className}`}>
      {title && <h1>{title}</h1>}
      <div
        className={`flex w-full h-full justify-center items-center bg-neutral text-neutral-content p-5 rounded-2xl gap-5 ${subClassName}`}
      >
        {children}
      </div>
    </div>
  );
};

export default ContainerBox;
