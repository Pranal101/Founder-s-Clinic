// "use client";
// import Link from "next/link";
// import companyData from "../../../data/topCompany";
// import Pagination from "../components/Pagination";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addCategory,
//   addDestination,
//   addFoundationDate,
//   addKeyword,
//   addLocation,
//   addPerPage,
//   addSort,
// } from "../../../features/filter/employerFilterSlice";
// import Image from "next/image";

// const FilterTopBox = () => {
//   const {
//     keyword,
//     location,
//     destination,
//     category,
//     foundationDate,
//     sort,
//     perPage,
//   } = useSelector((state) => state.employerFilter) || {};
//   const dispatch = useDispatch();

//   // keyword filter
//   const keywordFilter = (item) =>
//     keyword !== ""
//       ? item?.name?.toLowerCase().includes(keyword?.toLowerCase()) && item
//       : item;

//   // location filter
//   const locationFilter = (item) =>
//     location !== ""
//       ? item?.location?.toLowerCase().includes(location?.toLowerCase())
//       : item;

//   // destination filter
//   const destinationFilter = (item) =>
//     item?.destination?.min >= destination?.min &&
//     item?.destination?.max <= destination?.max;

//   // category filter
//   const categoryFilter = (item) =>
//     category !== ""
//       ? item?.category?.toLocaleLowerCase() === category?.toLocaleLowerCase()
//       : item;

//   // foundation date filter
//   const foundationDataFilter = (item) =>
//     item?.foundationDate?.min >= foundationDate?.min &&
//     item?.foundationDate?.max <= foundationDate?.max;

//   // sort filter
//   const sortFilter = (a, b) =>
//     sort === "des" ? a.id > b.id && -1 : a.id < b.id && -1;

//   let content = companyData
//     ?.slice(perPage.start !== 0 && 12, perPage.end !== 0 ? perPage.end : 24)
//     ?.filter(keywordFilter)
//     ?.filter(locationFilter)
//     ?.filter(destinationFilter)
//     ?.filter(categoryFilter)
//     ?.filter(foundationDataFilter)
//     ?.sort(sortFilter)
//     ?.map((company) => (
//       <div
//         className="company-block-four col-xl-3 col-lg-6 col-md-6 col-sm-12"
//         key={company.id}
//       >
//         <div className="inner-box">
//           <button className="bookmark-btn">
//             <span className="flaticon-bookmark"></span>
//           </button>

//           <div className="content-inner">
//             <span className="featured">Featured</span>
//             <span className="company-logo">
//               <Image
//                 width={50}
//                 height={50}
//                 src={company.img}
//                 alt="company brand"
//               />
//             </span>
//             <h4>
//               <Link href={`/employers-single-v2/${company.id}`}>
//                 {company.name}
//               </Link>
//             </h4>
//             <ul className="job-info flex-column">
//               <li className="me-0">
//                 <span className="icon flaticon-map-locator"></span>
//                 {company.location}
//               </li>
//               <li className="me-0">
//                 <span className="icon flaticon-briefcase"></span>
//                 {company.jobType}
//               </li>
//             </ul>
//           </div>

//           <div className="job-type me-0">Open Jobs – {company.jobNumber}</div>
//         </div>
//       </div>
//     ));

//   // per page handler
//   const perPageHandler = (e) => {
//     const pageData = JSON.parse(e.target.value);
//     dispatch(addPerPage(pageData));
//   };

//   // sort handler
//   const sortHandler = (e) => {
//     dispatch(addSort(e.target.value));
//   };

//   // clear handler
//   const clearAll = () => {
//     dispatch(addKeyword(""));
//     dispatch(addLocation(""));
//     dispatch(addDestination({ min: 0, max: 100 }));
//     dispatch(addCategory(""));
//     dispatch(addFoundationDate({ min: 1900, max: 2028 }));
//     dispatch(addSort(""));
//     dispatch(addPerPage({ start: 0, end: 0 }));
//   };
//   return (
//     <>
//       <div className="ls-switcher">
//         <div className="showing-result">
//           <div className="text">
//             <strong>{content?.length}</strong> jobs
//           </div>
//         </div>
//         {/* End showing-result */}
//         <div className="sort-by">
//           {keyword !== "" ||
//           location !== "" ||
//           destination.min !== 0 ||
//           destination.max !== 100 ||
//           category !== "" ||
//           foundationDate.min !== 1900 ||
//           foundationDate.max !== 2028 ||
//           sort !== "" ||
//           perPage.start !== 0 ||
//           perPage.end !== 0 ? (
//             <button
//               onClick={clearAll}
//               className="btn btn-danger text-nowrap me-2"
//               style={{
//                 minHeight: "45px",
//                 marginBottom: "15px",
//               }}
//             >
//               Clear All
//             </button>
//           ) : undefined}

//           <select
//             value={sort}
//             className="chosen-single form-select"
//             onChange={sortHandler}
//           >
//             <option value="">Sort by (default)</option>
//             <option value="asc">Newest</option>
//             <option value="des">Oldest</option>
//           </select>
//           {/* End select */}

//           <select
//             onChange={perPageHandler}
//             className="chosen-single form-select ms-3 "
//             value={JSON.stringify(perPage)}
//           >
//             <option
//               value={JSON.stringify({
//                 start: 0,
//                 end: 0,
//               })}
//             >
//               All
//             </option>
//             <option
//               value={JSON.stringify({
//                 start: 0,
//                 end: 10,
//               })}
//             >
//               10 per page
//             </option>
//             <option
//               value={JSON.stringify({
//                 start: 0,
//                 end: 20,
//               })}
//             >
//               20 per page
//             </option>
//             <option
//               value={JSON.stringify({
//                 start: 0,
//                 end: 24,
//               })}
//             >
//               24 per page
//             </option>
//           </select>
//           {/* End select */}
//         </div>
//       </div>
//       {/* End top filter bar box */}

//       <div className="row">{content}</div>
//       {/* End .row */}

//       <Pagination />
//       {/* <!-- Pagination --> */}
//     </>
//   );
// };

// export default FilterTopBox;
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  addKeyword,
  addLocation,
  addBudget,
  addSkillsRequired,
  addExperience,
  addGenderPreference,
  addSupportDuration,
  addSort,
  addPerPage,
} from "../../../features/filter/employerFilterSlice";
import Image from "next/image";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const FilterTopBox = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  // Default destructured values to prevent undefined errors
  const {
    keyword,
    location,
    budget = { min: 0, max: 100000 },
    skillsRequired = [],
    experience = { min: 0, max: 20 },
    genderPreference = "",
    supportDuration = { min: 0, max: 12 },
    sort = "",
    perPage = { start: 0, end: 12 },
  } = useSelector((state) => state.jobFilter) || {};

  const fetchJobs = async (user) => {
    try {
      const userToken = await user.getIdToken();
      console.log("usER token", userToken);
      const { data } = await axios.get(
        "http://13.126.254.235:4000/api/jobs/get-all-jobs",
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setJobs(data.jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchJobs(user);
      } else {
        console.error("User not authenticated");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Filtering functions
  const keywordFilter = (item) =>
    keyword ? item?.title?.toLowerCase().includes(keyword.toLowerCase()) : item;

  const locationFilter = (item) =>
    location
      ? item?.jobLocation?.toLowerCase().includes(location.toLowerCase())
      : item;

  const budgetFilter = (item) => {
    const itemBudget = parseInt(item?.budget) || 0;
    return itemBudget >= budget.min && itemBudget <= budget.max;
  };

  const skillsFilter = (item) =>
    skillsRequired.length
      ? skillsRequired.every((skill) => item?.skillsRequired.includes(skill))
      : item;

  const experienceFilter = (item) => {
    const levels = {
      "Entry-level": 0,
      "Mid-level": 10,
      "Senior-level": 20,
    };
    const itemExperience = levels[item?.experience] || 0;
    return itemExperience >= experience.min && itemExperience <= experience.max;
  };

  const genderFilter = (item) =>
    genderPreference
      ? item?.genderPreference?.toLowerCase() === genderPreference.toLowerCase()
      : item;

  const supportDurationFilter = (item) =>
    supportDuration.min === 0 || item?.supportDuration?.includes("support");

  const sortFilter = (a, b) =>
    sort === "des" ? a.postedDate < b.postedDate : a.postedDate > b.postedDate;

  // Filter and map jobs
  let content = jobs
    ?.filter(keywordFilter)
    ?.filter(locationFilter)
    ?.filter(budgetFilter)
    ?.filter(skillsFilter)
    ?.filter(experienceFilter)
    ?.filter(genderFilter)
    ?.filter(supportDurationFilter)
    ?.sort(sortFilter)
    ?.slice(perPage.start, perPage.end)
    ?.map((job) => (
      <div
        className="company-block-four col-xl-3 col-lg-6 col-md-6 col-sm-12"
        key={job._id}
      >
        <div className="inner-box">
          <button className="bookmark-btn">
            <span className="flaticon-bookmark"></span>
          </button>

          <div className="content-inner">
            <span className="featured">
              {job.isApproved ? "Approved" : "Pending"}
            </span>
            <span className="company-logo">
              <Image
                width={50}
                height={50}
                src="/default-logo.png"
                alt="company brand"
              />
            </span>
            <h4>
              <Link href={`/employers-single-v2/${job._id}`}>{job.title}</Link>
            </h4>
            <ul className="job-info flex-column">
              <li>
                <span className="icon flaticon-map-locator"></span>
                {job.jobLocation}
              </li>
              <li>
                <span className="icon flaticon-briefcase"></span>
                {job.budget}
              </li>
            </ul>
          </div>
          <div className="job-type">
            Skills – {job.skillsRequired.join(", ")}
          </div>
        </div>
      </div>
    ));

  const clearAll = () => {
    dispatch(addKeyword(""));
    dispatch(addLocation(""));
    dispatch(addBudget({ min: 0, max: 100000 }));
    dispatch(addSkillsRequired([]));
    dispatch(addExperience({ min: 0, max: 20 }));
    dispatch(addGenderPreference(""));
    dispatch(addSupportDuration({ min: 0, max: 12 }));
    dispatch(addSort(""));
    dispatch(addPerPage({ start: 0, end: 12 }));
  };

  return (
    <>
      <div className="ls-switcher">
        <div className="showing-result">
          <div className="text">
            <strong>{jobs.length}</strong> jobs
          </div>
        </div>
        <div className="sort-by">
          {keyword || location || sort || genderPreference ? (
            <button onClick={clearAll} className="btn btn-danger">
              Clear All
            </button>
          ) : null}

          <select
            value={sort}
            className="form-select"
            onChange={(e) => dispatch(addSort(e.target.value))}
          >
            <option value="">Sort by (default)</option>
            <option value="asc">Newest</option>
            <option value="des">Oldest</option>
          </select>
        </div>
      </div>
      {loading ? <div>Loading...</div> : <div className="row">{content}</div>}
      <Pagination totalJobs={jobs.length} />
    </>
  );
};

export default FilterTopBox;
