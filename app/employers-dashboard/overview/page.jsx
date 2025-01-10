import dynamic from "next/dynamic";
import EmployersList from "@/components/dashboard-pages/employers-dashboard/overview";

export const metadata = {
  title: "Employers List V3 || Superio - Job Borad React NextJS Template",
  description: "Superio - Job Borad React NextJS Template",
};

const index = () => {
  return (
    <>
      <EmployersList />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
