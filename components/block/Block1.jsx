import Image from "next/image";

const Block1 = () => {
  const blockContent = [
    {
      id: 1,
      icon: "/images/resource/work-1.png",
      title: "Enterprises",
      text: `Employers on average spend 31 seconds scanning resumes to identify potential matches.`,
    },
    {
      id: 2,
      icon: "/images/resource/work-2.png",
      title: "Professioanals",
      text: `Employers on average spend 31 seconds scanning resumes to identify potential matches.`,
    },
    {
      id: 3,
      icon: "/images/resource/work-3.png",
      title: "Interns",
      text: `Employers on average spend 31 seconds scanning resumes to identify potential matches.`,
    },
  ];
  return (
    <>
      {blockContent.map((item) => (
        <div className="work-block col-lg-4 col-md-6 col-sm-12" key={item.id}>
          <div className="inner-box">
            <figure className="image">
              <Image
                width={105}
                height={113}
                src={item.icon}
                alt="how it works"
              />
            </figure>
            <h5>{item.title}</h5>
            <p>{item.text}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Block1;
