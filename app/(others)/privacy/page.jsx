import dynamic from "next/dynamic";

import Privacy from "@/components/pages-menu/privacy";

export const metadata = {
  title: "Privacy Policy",
};

const index = () => {
  return (
    <>
      <Privacy />
    </>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
