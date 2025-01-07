import dynamic from "next/dynamic";
import Applicants from "@/components/dashboard-pages/networking-dashboard/applicants";

export const metadata = {
  title: "Applicants",
};

const index = () => {
  return (
    <>
      <Applicants />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
