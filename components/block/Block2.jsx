import Image from "next/image";

const Block2 = () => {
  const blockContent = [
    {
      id: 1,
      icon: "/images/resource/process-1.png",
      title: (
        <>
          Define Your Needs
          <p>
            Tell us about your business goals, challenges, and the services
            you're looking for—whether it's finance, marketing, legal, HR, or
            IT.
          </p>
        </>
      ),
    },
    {
      id: 2,
      icon: "/images/resource/process-2.png",
      title: (
        <>
          AI Matchmaking Engine <br />
          <p>
            Our AI algorithm analyzes your input and compares it against a wide
            database of trusted service providers and resources, ensuring a
            highly relevant match.
          </p>
        </>
      ),
    },
    {
      id: 3,
      icon: "/images/resource/process-3.png",
      title: (
        <>
          Instant Connections <br />
          <p>
            Get introduced to vetted professionals and companies who can provide
            the exact support you need, saving you hours of research.
          </p>
        </>
      ),
    },
  ];
  return (
    <>
      {blockContent.map((item) => (
        <div
          className="process-block col-lg-4 col-md-6 col-sm-12"
          key={item.id}
        >
          <div className="icon-box">
            <Image width={50} height={61} src={item.icon} alt="how it works" />
          </div>
          <h4>{item.title}</h4>
        </div>
      ))}
    </>
  );
};

export default Block2;
