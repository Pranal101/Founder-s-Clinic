import dynamic from "next/dynamic";
import ApproveProfiles from "@/components/dashboard-pages/admin-dashboard/approve-profiles";

export const metadata = {
  title: "Approve Inqueries",
};

const index = () => {
  return (
    <>
      <ApproveProfiles />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
