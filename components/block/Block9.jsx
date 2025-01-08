import Image from "next/image";

const Block9 = () => {
  const blockContent = [
    {
      id: 1,
      img: "/images/index-12/steps/1.png",
      serialNo: "01",
      title: "Define Your Needs",
      text: `Tell us about your business goals, challenges, and the services you're looking for—whether it's finance, marketing, legal, HR, or IT.`,
    },
    {
      id: 2,
      img: "/images/index-12/steps/2.png",
      serialNo: "02",
      title: "AI Matchmaking Engine",
      text: `Our AI algorithm analyzes your input and compares it against a wide database of trusted service providers and resources, ensuring a highly relevant match.`,
    },
    {
      id: 3,
      img: "/images/index-12/steps/3.png",
      serialNo: "03",
      title: "Instant Connections",
      text: `Get introduced to vetted professionals and companies who can provide the exact support you need, saving you hours of research.`,
    },
  ];

  return (
    <>
      {blockContent.map((item) => (
        <div className="col-xl-4 col-lg-4 col-md-6" key={item.id}>
          <div className="step-item text-center">
            <div className="image">
              <Image width={248} height={165} src={item.img} alt="image" />
            </div>
            <h3 className="title">
              <span className="text-red">{item.serialNo}</span> {item.title}
            </h3>
            <p className="text">{item.text}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Block9;
