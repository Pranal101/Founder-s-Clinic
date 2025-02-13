import dynamic from "next/dynamic";

import Subscription from "@/components/pages-menu/subscription";

export const metadata = {
  title: "Subscription Plans",
};

const index = () => {
  return (
    <>
      <Subscription />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
