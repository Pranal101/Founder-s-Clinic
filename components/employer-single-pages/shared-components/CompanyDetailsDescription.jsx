import GalleryBox from "./GalleryBox";

const JobDetailsDescriptions = ({ businessDescription }) => {
  return (
    <div className="job-detail">
      <h4>About Company</h4>
      <p>
        {businessDescription || "No description available for this company."}
      </p>

      {/* <div className="row images-outer">
        <GalleryBox />
      </div> */}
    </div>
  );
};

export default JobDetailsDescriptions;
