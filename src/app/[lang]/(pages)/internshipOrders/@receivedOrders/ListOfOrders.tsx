import ContainerBox from "@/app/components/ContainerBox";
import React from "react"; // Ensure React is in scope when using JSX

/**
 * Renders the orders.
 * @param orders The list of orders to be rendered.
 * @param setIsModalOpen A function to set the state of the modal (open/close).
 * @param saveStatus A function to save the status of an order.
 * @param setSelectedOrder A function to set the currently selected order.
 * @returns JSX.Element
 */
function renderOrders(orders, setIsModalOpen, saveStatus, setSelectedOrder) {
  if (orders?.length === 0) {
    return <p>No orders</p>;
  }

  const groupedOrders = orders.reduce((acc, order) => {
    if (!acc[order.internshipOrderID]) {
      acc[order.internshipOrderID] = [];
    }
    acc[order.internshipOrderID].push(order);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-5 justify-center">
      {Object.keys(groupedOrders).map((internshipOrderID) => (
        <div
          key={internshipOrderID}
          className="card-body card bg-base-100 shadow-xl w-full"
        >
          {groupedOrders[internshipOrderID].map((order) => (
            <div key={order.id} className=" text-base-content ">
              <div className="flex justify-between w-full gap-5 p-2 md:p-5">
                <div className="flex w-full flex-row items-center">
                  <div className="flex items-center flex-wrap flex-grow ml-4 gap-5">
                    <div className="text-lg font-bold">
                      {order.studyProgram.educationInstitute.name} -{" "}
                      {order.studyProgram.name}
                    </div>
                    <div className="text-opacity-50">
                      {order.numStudents - order.numStudentsAccepted} studenter
                    </div>
                    <div className="text-opacity-50">
                      {order.internshipField}, {order.studyYear} år studenter
                    </div>
                    <div className="text-sm text-opacity-50">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <button
                    className="btn btn-primary ml-2 md:ml-5"
                    onClick={() => {
                      setSelectedOrder(order);
                      setIsModalOpen(true);
                    }}
                    disabled={order.status === "Finalized"}
                  >
                    Distribuer
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="dropdown dropdown-middle w-full ">
            <div
              tabIndex={0}
              role="button"
              className="w-full font-semibold btn p-2 text-neutral-content bg-neutral text-center flex items-center"
            >
              {groupedOrders[internshipOrderID][0].status === "Finalized"
                ? "Ferdig"
                : groupedOrders[internshipOrderID][0].status === "Pending"
                  ? "Venter"
                  : groupedOrders[internshipOrderID][0].status}
            </div>
            <ul className=" flex dropdown-content w-full z-[1] menu p-2 bg-base-100 rounded-box gap-2 shadow-xl border border-base-300">
              <li>
                <button
                  className="flex justify-center text-base-content p-3 bg-base hover:bg-accent hover:text-accent-content focus:bg-accent focus:text-accent-content"
                  onClick={() => {
                    // Directly call saveStatus passing the order ID and new status
                    saveStatus(internshipOrderID, "Pending");
                  }}
                >
                  Venter
                </button>
              </li>
              <li>
                <button
                  className="flex justify-center text-base-content p-3 bg-base hover:bg-accent hover:text-accent-content focus:bg-accent focus:text-accent-content"
                  onClick={() => {
                    // Directly call saveStatus passing the order ID and new status
                    saveStatus(internshipOrderID, "Finalized");
                  }}
                >
                  Ferdig
                </button>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 *
 * @param root0 The props passed to the component.
 * @param root0.orders The list of orders to be rendered.
 * @param root0.setIsModalOpen A function to set the state of the modal (open/close).
 * @param root0.title The title of the modal.
 * @param root0.saveStatus A function to save the status of an order.
 * @param root0.setSelectedOrder A function to set the currently selected order.
 * @returns JSX.Element
 */
function ListOfOrders({
  orders,
  setIsModalOpen,
  title,
  saveStatus,
  setSelectedOrder,
}) {
  return (
    <ContainerBox title={title}>
      {renderOrders(orders, setIsModalOpen, saveStatus, setSelectedOrder)}
    </ContainerBox>
  );
}

export default ListOfOrders;
