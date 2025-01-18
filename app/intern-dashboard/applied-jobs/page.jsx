import dynamic from "next/dynamic";
import AppliedJobs from "@/components/dashboard-pages/intern-dashboard/applied-jobs";

export const metadata = {
  title: "Applied Jobs",
};

const index = () => {
  return (
    <>
      <AppliedJobs />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
