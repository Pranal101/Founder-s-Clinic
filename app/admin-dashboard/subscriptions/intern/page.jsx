import dynamic from "next/dynamic";
import Subscriptions from "@/components/dashboard-pages/admin-dashboard/subscriptions/intern";

export const metadata = {
  title: "Intern Subscriptions",
};

const index = () => {
  return (
    <>
      <Subscriptions />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
