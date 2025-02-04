import dynamic from "next/dynamic";
import Subscriptions from "@/components/dashboard-pages/admin-dashboard/subscriptions/networking";

export const metadata = {
  title: "Networking Subscriptions",
};

const index = () => {
  return (
    <>
      <Subscriptions />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
