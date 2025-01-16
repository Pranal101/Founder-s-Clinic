import dynamic from "next/dynamic";
import Subscriptions from "@/components/dashboard-pages/admin-dashboard/subscriptions/professional";

export const metadata = {
  title: "Professional Subscriptions",
};

const index = () => {
  return (
    <>
      <Subscriptions />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
