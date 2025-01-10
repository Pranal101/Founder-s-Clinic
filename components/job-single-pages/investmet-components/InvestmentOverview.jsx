import { formatDistanceToNow } from "date-fns";

const timeSincePosted = (date) => {
  if (!date) return "N/A";
  const parsedDate = new Date(date);
  return formatDistanceToNow(parsedDate, { addSuffix: true });
};

const InvestmentOverview = ({ investment }) => {
  return (
    <ul>
      <li>
        <i className="icon icon-calendar"></i>
        <h5>Date Posted:</h5>
        <span>{timeSincePosted(investment?.postedDate)}</span>
      </li>
      <li>
        <i className="icon icon-location"></i>
        <h5>Location:</h5>
        <span>{investment?.city || "Not specified"}</span>
      </li>
      <li>
        <i className="icon icon-user-2"></i>
        <h5>Founded Year:</h5>
        <span>{investment?.foundedYear || "Not specified"}</span>
      </li>
      <li>
        <i className="icon icon-budget"></i>
        <h5>Seeking Funding:</h5>
        <span>{investment?.seekingFundingAmount || "Not specified"}</span>
      </li>
      <li>
        <i className="icon icon-clock"></i>
        <h5>Funding Stage:</h5>
        <span>{investment?.fundingStage || "Not specified"}</span>
      </li>
    </ul>
  );
};

export default InvestmentOverview;
