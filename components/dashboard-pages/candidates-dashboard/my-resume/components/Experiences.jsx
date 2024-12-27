// const Experiences = () => {
//   return (
//     <div className="resume-outer theme-blue">
//       <div className="upper-title">
//         <h4>Work & Experience</h4>
//         <button className="add-info-btn">
//           <span className="icon flaticon-plus"></span> Add Work
//         </button>
//       </div>
//       {/* <!-- Resume BLock --> */}
//       <div className="resume-block">
//         <div className="inner">
//           <span className="name">S</span>
//           <div className="title-box">
//             <div className="info-box">
//               <h3>Product Designer</h3>
//               <span>Spotify Inc.</span>
//             </div>
//             <div className="edit-box">
//               <span className="year">2012 - 2014</span>
//               <div className="edit-btns">
//                 <button>
//                   <span className="la la-pencil"></span>
//                 </button>
//                 <button>
//                   <span className="la la-trash"></span>
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="text">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a
//             ipsum tellus. Interdum et malesuada fames ac ante
//             <br /> ipsum primis in faucibus.
//           </div>
//         </div>
//       </div>

//       {/* <!-- Resume BLock --> */}
//       <div className="resume-block">
//         <div className="inner">
//           <span className="name">D</span>
//           <div className="title-box">
//             <div className="info-box">
//               <h3>Sr UX Engineer</h3>
//               <span>Dropbox Inc.</span>
//             </div>
//             <div className="edit-box">
//               <span className="year">2012 - 2014</span>
//               <div className="edit-btns">
//                 <button>
//                   <span className="la la-pencil"></span>
//                 </button>
//                 <button>
//                   <span className="la la-trash"></span>
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="text">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a
//             ipsum tellus. Interdum et malesuada fames ac ante
//             <br /> ipsum primis in faucibus.
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Experiences;
// import { useState } from "react";

// const Experiences = () => {
//   const [experienceList, setExperienceList] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [editData, setEditData] = useState({});

//   const handleAddExperience = () => {
//     const newExperience = {
//       id: Date.now(),
//       position: "New Position",
//       company: "New Company",
//       year: "Year",
//       description: "Add description here.",
//       initial: "N",
//     };
//     setExperienceList([...experienceList, newExperience]);
//   };

//   const handleDeleteExperience = (id) => {
//     setExperienceList(experienceList.filter((exp) => exp.id !== id));
//   };

//   const handleEditExperience = (exp) => {
//     setEditingId(exp.id);
//     setEditData(exp);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditData({ ...editData, [name]: value });
//   };

//   const handleSaveEdit = () => {
//     setExperienceList(
//       experienceList.map((exp) =>
//         exp.id === editingId ? { ...exp, ...editData } : exp
//       )
//     );
//     setEditingId(null);
//   };

//   return (
//     <div className="resume-outer theme-blue">
//       <div className="upper-title">
//         <h4>Work & Experience</h4>
//         <button className="add-info-btn" onClick={handleAddExperience}>
//           <span className="icon flaticon-plus"></span> Add Work
//         </button>
//       </div>
//       {experienceList.map((exp) => (
//         <div className="resume-block" key={exp.id}>
//           <div className="inner">
//             <span className="name">{exp.initial}</span>
//             <div className="title-box">
//               <div className="info-box">
//                 {editingId === exp.id ? (
//                   <>
//                     <div className="form-group col-lg-12 col-md-12">
//                       <label>Email Address</label>
//                       <input
//                         type="text"
//                         name="position"
//                         value={editData.position}
//                         onChange={handleChange}
//                       />
//                     </div>
//                     <input
//                       type="text"
//                       name="company"
//                       value={editData.company}
//                       onChange={handleChange}
//                     />
//                   </>
//                 ) : (
//                   <>
//                     <h3>{exp.position}</h3>
//                     <span>{exp.company}</span>
//                   </>
//                 )}
//               </div>
//               <div className="edit-box">
//                 {editingId === exp.id ? (
//                   <button onClick={handleSaveEdit}>Save</button>
//                 ) : (
//                   <>
//                     <span className="year">{exp.year}</span>
//                     <div className="edit-btns">
//                       <button onClick={() => handleEditExperience(exp)}>
//                         <span className="la la-pencil"></span>
//                       </button>
//                       <button onClick={() => handleDeleteExperience(exp.id)}>
//                         <span className="la la-trash"></span>
//                       </button>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//             {editingId === exp.id ? (
//               <textarea
//                 name="description"
//                 value={editData.description}
//                 onChange={handleChange}
//               ></textarea>
//             ) : (
//               <div className="text">{exp.description}</div>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Experiences;
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Experiences = () => {
  const [experienceList, setExperienceList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newExperience, setNewExperience] = useState({
    position: "",
    company: "",
    year: "",
    description: "",
  });

  useEffect(() => {
    const fetchExperiences = async (user) => {
      try {
        const userToken = await user.getIdToken();
        const response = await axios.get(
          "http://localhost:4000/api/user/company-profile",
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        const experienceData = response.data.profile.workExperience;
        console.log(response.data.profile.workExperience);
        if (experienceData) {
          setExperienceList(experienceData);
        }
      } catch (error) {
        console.error(
          "Error fetching experiences:",
          error.response?.data || error
        );
      }
    };

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchExperiences(user);
      } else {
        console.error("User not authenticated");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddExperience = () => {
    setIsAddingNew(true);
  };

  const handleSaveNewExperience = async (e) => {
    e.preventDefault();
    const newExp = {
      id: Date.now(),
      position: newExperience.position,
      company: newExperience.company,
      year: newExperience.year,
      description: newExperience.description,
      initial: newExperience.company[0],
    };

    setExperienceList([...experienceList, newExp]);
    setIsAddingNew(false);

    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const userToken = await user.getIdToken();

      await axios.patch(
        "http://localhost:4000/api/user/profile",
        {
          profileData: {
            workExperience: [...experienceList, newExp],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      console.log("Experience added successfully");
    } catch (error) {
      console.error("Error adding experience:", error.response?.data || error);
    }
  };

  const handleDeleteExperience = async (experienceId) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const userToken = await user.getIdToken();

      await axios.patch(
        "http://localhost:4000/api/user/profile/experience",
        {
          userId: user.uid,
          experienceId,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      setExperienceList(
        experienceList.filter((exp) => exp._id !== experienceId)
      );
      console.log("Experience deleted successfully");
    } catch (error) {
      console.error(
        "Error deleting experience:",
        error.response?.data || error
      );
    }
  };

  const handleEditExperience = (e, exp) => {
    e.preventDefault();
    setEditingId(exp._id);
    setEditFormData(exp);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    const updatedList = experienceList.map((exp) =>
      exp._id === editingId
        ? { ...editFormData, initial: editFormData.company[0] }
        : exp
    );

    setExperienceList(updatedList);
    setEditingId(null);

    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const userToken = await user.getIdToken();

      await axios.patch(
        "http://localhost:4000/api/user/profile",
        {
          profileData: {
            workExperience: updatedList,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      console.log("Experience updated successfully");
    } catch (error) {
      console.error(
        "Error updating experience:",
        error.response?.data || error
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingId) {
      setEditFormData({ ...editFormData, [name]: value });
    } else {
      setNewExperience({ ...newExperience, [name]: value });
    }
  };

  return (
    <div className="resume-outer">
      <div className="upper-title">
        <h4>Work & Experience</h4>
        <button className="add-info-btn" onClick={handleAddExperience}>
          <span className="icon flaticon-plus"></span> Add Experience
        </button>
      </div>

      {isAddingNew && (
        <div className="resume-block">
          <div className="inner">
            <h3>Add Experience</h3>
            <div className="form-group col-lg-6 col-md-12">
              <label>Position</label>
              <input
                type="text"
                name="position"
                value={newExperience.position}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-lg-6 col-md-12">
              <label>Company</label>
              <input
                type="text"
                name="company"
                value={newExperience.company}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-lg-6 col-md-12">
              <label>Year</label>
              <input
                type="text"
                name="year"
                value={newExperience.year}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-lg-6 col-md-12">
              <label>Description</label>
              <textarea
                name="description"
                value={newExperience.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <button onClick={handleSaveNewExperience}>Save</button>
          </div>
        </div>
      )}

      {experienceList.map((exp) => (
        <div className="resume-block" key={exp.id}>
          <div className="inner">
            <span className="name">{exp.company[0]}</span>
            {editingId === exp._id ? (
              <div>
                <div className="form-group col-lg-6 col-md-12">
                  <label>Position</label>
                  <input
                    type="text"
                    name="position"
                    value={editFormData.position}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group col-lg-6 col-md-12">
                  <label>Company</label>
                  <input
                    type="text"
                    name="company"
                    value={editFormData.company}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group col-lg-6 col-md-12">
                  <label>Year</label>
                  <input
                    type="text"
                    name="year"
                    value={editFormData.year}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group col-lg-6 col-md-12">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={editFormData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <button onClick={handleSaveEdit}>Save</button>
              </div>
            ) : (
              <div>
                <div className="title-box">
                  <div className="info-box">
                    <h3>{exp.position}</h3>
                    <span>{exp.company}</span>
                  </div>
                  <div className="edit-box">
                    <span className="year">{exp.year}</span>
                    <div className="edit-btns">
                      <button onClick={(e) => handleEditExperience(e, exp)}>
                        <span className="la la-pencil"></span>
                      </button>
                      <button onClick={() => handleDeleteExperience(exp._id)}>
                        <span className="la la-trash"></span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text">{exp.description}</div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Experiences;
