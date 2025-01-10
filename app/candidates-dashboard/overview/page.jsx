import dynamic from "next/dynamic";

import CandidatesList from "@/components/dashboard-pages/candidates-dashboard/overview";

export const metadata = {
  title: "Professionals List",
};

const index = () => {
  return (
    <>
      <CandidatesList />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
