// const JobOverView2 = () => {
//   return (
//     <ul>
//       <li>
//         <i className="icon icon-calendar"></i>
//         <h5>Date Posted:</h5>
//         <span>Posted 1 hours ago</span>
//       </li>
//       <li>
//         <i className="icon icon-expiry"></i>
//         <h5>Expiration date:</h5>
//         <span>April 06, 2021</span>
//       </li>
//       <li>
//         <i className="icon icon-location"></i>
//         <h5>Location:</h5>
//         <span>London, UK</span>
//       </li>
//       <li>
//         <i className="icon icon-user-2"></i>
//         <h5>Job Title:</h5>
//         <span>Designer</span>
//       </li>
//       <li>
//         <i className="icon icon-clock"></i>
//         <h5>Hours:</h5>
//         <span>50h / week</span>
//       </li>
//       <li>
//         <i className="icon icon-rate"></i>
//         <h5>Rate:</h5>
//         <span>$15 - $25 / hour</span>
//       </li>
//       <li>
//         <i className="icon icon-salary"></i>
//         <h5>Salary:</h5>
//         <span>$35k - $45k</span>
//       </li>
//     </ul>
//   );
// };

// export default JobOverView2;
import { formatDistanceToNow } from "date-fns";

const timeSincePosted = (date) => {
  if (!date) return "N/A";
  const parsedDate = new Date(date);
  return formatDistanceToNow(parsedDate, { addSuffix: true });
};

const JobOverView2 = ({ job }) => {
  return (
    <ul>
      <li>
        <i className="icon icon-calendar"></i>
        <h5>Date Posted:</h5>
        <span>{timeSincePosted(job.postedDate)}</span>
      </li>
      <li>
        <i className="icon icon-expiry"></i>
        <h5>Expiration Date:</h5>
        <span>{new Date(job.expectedStartDate).toLocaleDateString()}</span>
      </li>
      {/* <li>
        <i className="icon icon-location"></i>
        <h5>Location:</h5>
        <span>{job.jobLocation || "Not specified"}</span>
      </li> */}
      <li>
        <i className="icon icon-user-2"></i>
        <h5>Project Title:</h5>
        <span>{job.title || "Not specified"}</span>
      </li>
      {/* <li>
        <i className="icon icon-clock"></i>
        <h5>Hours:</h5>
        <span>{job.hours || "Not specified"}</span>
      </li>
      <li>
        <i className="icon icon-rate"></i>
        <h5>Rate:</h5>
        <span>{job.rate || "Not specified"}</span>
      </li> */}
      <li>
        <i className="icon icon-salary"></i>
        <h5>Salary:</h5>
        <span>
          {job.budget || "Not specified"} {job.currency}
        </span>
      </li>
    </ul>
  );
};

export default JobOverView2;
