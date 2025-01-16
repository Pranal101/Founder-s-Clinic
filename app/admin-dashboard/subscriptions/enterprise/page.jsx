import dynamic from "next/dynamic";
import Subscriptions from "@/components/dashboard-pages/admin-dashboard/subscriptions/enterprise";

export const metadata = {
  title: "Enterpirse Subscriptions",
};

const index = () => {
  return (
    <>
      <Subscriptions />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
