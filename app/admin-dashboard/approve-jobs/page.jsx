import dynamic from "next/dynamic";
import ApproveJobs from "@/components/dashboard-pages/admin-dashboard/approve-jobs";

export const metadata = {
  title: "Approve Inqueries",
};

const index = () => {
  return (
    <>
      <ApproveJobs />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
