const InvestmentInfo = ({ investment }) => {
  return (
    <ul className="company-info">
      <li>
        Business Type:{" "}
        <span>{investment?.businessType || "Not specified"}</span>
      </li>
      <li>
        Team size: <span>{investment?.teamSize || "Not specified"}</span>
      </li>
      <li>
        Target Market:{" "}
        <span>{investment?.targetMarket || "Not specified"}</span>
      </li>
      <li>
        Previous Funding Raised:{" "}
        <span>{investment?.fundingAmount || "Not specified"}</span>
      </li>
      <li>
        Phone: <span>{investment?.contactNumber || "Not specified"}</span>
      </li>
      <li>
        Location:{" "}
        <span>
          {investment?.city}, {investment?.country || "Not specified"}
        </span>
      </li>
      {/* <li>
        Social media: <Social socialLinks={investment?.socialLinks || []} />
      </li> */}
    </ul>
  );
};

export default InvestmentInfo;
