import { checkUserRole } from "@/lib/auth";
import { Role } from "@/app/api/auth/[...nextauth]/nextauth";

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
  return <>{layout}</>;
}
