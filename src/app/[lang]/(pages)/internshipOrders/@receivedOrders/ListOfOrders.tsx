import ContainerBox from "@/app/components/ContainerBox";
import React from "react"; // Ensure React is in scope when using JSX

/**
 * Returns the text for the status.
 * @param status The status of the order.
 * @returns the either Ferdig, Venter or given status (if it does not match "Finalized" or "Pending") based on given status
 */


/**
 * Renders the orders.
 * @param orders The list of orders to be rendered.
 * @param setIsModalOpen A function to set the state of the modal (true/false).
 * @param saveStatus A function to save the status of an order.
 * @param setSelectedOrder A function to set the currently selected order.
 * @returns JSX.Element
 */
function renderOrders(orders, setIsModalOpen, saveStatus, setSelectedOrder) {
  return (
   
  );
}

/**
 *
 * @param root0 The props passed to the component.
 * @param root0.orders The list of orders to be rendered.
 * @param root0.setIsModalOpen A function to set the state of the modal (true/false).
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
