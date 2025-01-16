import dynamic from "next/dynamic";
import ApproveEvents from "@/components/dashboard-pages/admin-dashboard/approve-events";

export const metadata = {
  title: "Approve Inqueries",
};

const index = () => {
  return (
    <>
      <ApproveEvents />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
