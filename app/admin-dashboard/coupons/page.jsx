import dynamic from "next/dynamic";
import Coupons from "@/components/dashboard-pages/admin-dashboard/coupons";

export const metadata = {
  title: "Approve Inqueries",
};

const index = () => {
  return (
    <>
      <Coupons />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
