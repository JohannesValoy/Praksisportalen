import { checkUserRole } from "@/lib/auth";
import { Role } from "@/app/api/auth/[...nextauth]/nextauth";
/**
 * Depending on the user role, it would allow to see the received orders or place an order.
 * @param root The root element.
 * @param root.receivedOrders the receivedOrders Page
 * @param root.placeOrder the placeOrder Page
 * @returns a layout with the received orders for admins or the place order page for coordinators.
 */
export default async function Layout({
  receivedOrders,
  placeOrder,
}: Readonly<{
  receivedOrders: React.ReactNode;
  placeOrder: React.ReactNode;
}>) {
  const role = await checkUserRole();
  let layout = null;
  if (role === Role.admin) {
    layout = receivedOrders;
  } else if (role === Role.coordinator) {
    layout = placeOrder;
  }
  //TODO What if the user is not a coordinator or admin? Could happen if we configured the middleware wrong.
  //TODO: Should not also coordinators be able to see their own orders?

  return <>{layout}</>;
}
