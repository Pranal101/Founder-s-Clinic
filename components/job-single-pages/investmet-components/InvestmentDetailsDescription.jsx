const InvestmentDetailsDescriptions = ({ investment }) => {
  return (
    <div className="investment-detail">
      <h4>Business Description</h4>
      <p>{investment?.businessDescription || "No description available"}</p>

      {/* <h4>Services Offered</h4>
      <p>{investment?.servicesOffered || "No services available"}</p>

      <h4>Business Requirements</h4>
      <ul className="list-style-three">
        {investment?.businessRequirements?.map((requirement, index) => (
          <li key={index}>{requirement}</li>
        )) || <li>No requirements specified</li>}
      </ul> */}
    </div>
  );
};

export default InvestmentDetailsDescriptions;
