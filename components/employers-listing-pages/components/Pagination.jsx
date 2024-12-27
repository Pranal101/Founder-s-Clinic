// const Pagination = () => {
//   return (
//     <nav className="ls-pagination">
//       <ul>
//         <li className="prev">
//           <a href="#">
//             <i className="fa fa-arrow-left"></i>
//           </a>
//         </li>
//         <li>
//           <a href="#">1</a>
//         </li>
//         <li>
//           <a href="#" className="current-page">
//             2
//           </a>
//         </li>
//         <li>
//           <a href="#">3</a>
//         </li>
//         <li className="next">
//           <a href="#">
//             <i className="fa fa-arrow-right"></i>
//           </a>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Pagination;
import { useDispatch, useSelector } from "react-redux";
import { addPerPage } from "../../../features/filter/employerFilterSlice";

const Pagination = ({ totalJobs }) => {
  const dispatch = useDispatch();
  const { perPage = { start: 0, end: 12 } } = useSelector(
    (state) => state.employerFilter
  );

  const jobsPerPage = 12; // Default jobs per page
  const totalPages = Math.ceil(totalJobs / jobsPerPage);
  const currentPage = Math.floor(perPage.start / jobsPerPage) + 1;

  const handlePageChange = (page) => {
    const start = (page - 1) * jobsPerPage;
    const end = start + jobsPerPage;
    dispatch(addPerPage({ start, end }));
  };

  const handleClick = (event, page) => {
    event.preventDefault(); // Prevent page reload
    handlePageChange(page);
  };

  if (totalPages <= 1) return null; // Hide pagination if there's only one page

  return (
    <nav className="ls-pagination">
      <ul>
        {/* Previous Button */}
        <li className={`prev ${currentPage === 1 ? "disabled" : ""}`}>
          <a href="#" onClick={(e) => handleClick(e, currentPage - 1)}>
            <i className="fa fa-arrow-left"></i>
          </a>
        </li>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          return (
            <li key={page}>
              <a
                href="#"
                className={currentPage === page ? "current-page" : ""}
                onClick={(e) => handleClick(e, page)}
              >
                {page}
              </a>
            </li>
          );
        })}

        {/* Next Button */}
        <li className={`next ${currentPage === totalPages ? "disabled" : ""}`}>
          <a href="#" onClick={(e) => handleClick(e, currentPage + 1)}>
            <i className="fa fa-arrow-right"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
