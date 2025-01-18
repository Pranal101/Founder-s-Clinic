import dynamic from "next/dynamic";

import CandidatesList from "@/components/dashboard-pages/intern-dashboard/overview";

export const metadata = {
  title: "Interns List",
};

const index = () => {
  return (
    <>
      <CandidatesList />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
