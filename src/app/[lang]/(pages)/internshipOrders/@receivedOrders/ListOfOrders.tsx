import ContainerBox from "@/app/components/ContainerBox";

/**
 *
 * @param orders The list of orders to display.
 * @param setSelectedOrder The function to set the selected order.
 * @param setIsModalOpen The function to set the modal open state.
 * @returns A component that displays a list of orders.
 */
function renderOrders(orders, setSelectedOrder, setIsModalOpen) {
  if (orders?.length === 0) {
    return <p>No orders</p>;
  } else if (orders) {
    return (
      <div className="flex flex-wrap gap-5 justify-center">
        {orders.map((order) => (
          <div
            key={order.id}
            className="card bg-base-100  text-base-content shadow-xl"
          >
            <div className="card-body flex gap-5 p-2 md:p-5">
              <div className="flex flex-row items-center">
                <div className="flex items-center flex-wrap flex-grow ml-4 gap-5">
                  <div className="text-lg font-bold">
                    {order.studyProgram.educationInstitute.name} -{" "}
                    {order.studyProgram.name}
                  </div>
                  <div className="text-opacity-50">
                    {order.numStudents - order.numStudentsAccepted} students
                  </div>
                  <div className="text-opacity-50">
                    {order.internshipField}, {order.studyYear} år studenter
                  </div>
                  <div className="text-sm text-opacity-50">
                    {order.createdAt.toLocaleDateString()}
                  </div>
                </div>
                <button
                  className="btn btn-primary ml-2 md:ml-5"
                  onClick={() => {
                    setSelectedOrder(order);
                    setIsModalOpen(true);
                  }}
                >
                  Distribuer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return <span className="loading loading-spinner loading-lg"></span>;
  }
}

/**
 * A component that displays a list of orders.
 * @param root0 The props of the component.
 * @param root0.orders The list of orders to display.
 * @param root0.setSelectedOrder The function to set the selected order.
 * @param root0.setIsModalOpen The function to set the modal open state.
 * @returns A component that displays a list of orders.
 */
function ListOfOrders({ orders, setSelectedOrder, setIsModalOpen }) {
  return (
    <ContainerBox title="Received Orders">
      {renderOrders(orders, setSelectedOrder, setIsModalOpen)}
    </ContainerBox>
  );
}
export default ListOfOrders;
