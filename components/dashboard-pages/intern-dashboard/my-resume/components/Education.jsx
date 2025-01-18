// const Education = () => {
//   return (
//     <div className="resume-outer">
//       <div className="upper-title">
//         <h4>Education</h4>
//         <button className="add-info-btn">
//           <span className="icon flaticon-plus"></span> Add Aducation
//         </button>
//       </div>
//       {/* <!-- Resume BLock --> */}
//       <div className="resume-block">
//         <div className="inner">
//           <span className="name">M</span>
//           <div className="title-box">
//             <div className="info-box">
//               <h3>Bachlors in Fine Arts</h3>
//               <span>Modern College</span>
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
//           <span className="name">H</span>
//           <div className="title-box">
//             <div className="info-box">
//               <h3>Computer Science</h3>
//               <span>Harvard University</span>
//             </div>
//             <div className="edit-box">
//               <span className="year">2008 - 2012</span>
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

// export default Education;
// import { useState } from "react";

// const Education = () => {
//   const [educationList, setEducationList] = useState([
//     {
//       id: 1,
//       degree: "Bachelors in Fine Arts",
//       school: "Modern College",
//       year: "2012 - 2014",
//       description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       initial: "M",
//     },
//     {
//       id: 2,
//       degree: "Computer Science",
//       school: "Harvard University",
//       year: "2008 - 2012",
//       description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       initial: "H",
//     },
//   ]);

//   const handleAddEducation = (e) => {
//     e.preventDefault();
//     const newEducation = {
//       id: Date.now(),
//       degree: "New Degree",
//       school: "New School",
//       year: "Year",
//       description: "Add description here.",
//       initial: "N",
//     };
//     setEducationList([...educationList, newEducation]);
//   };

//   return (
//     <div className="resume-outer">
//       <div className="upper-title">
//         <h4>Education</h4>
//         <button className="add-info-btn" onClick={handleAddEducation}>
//           <span className="icon flaticon-plus"></span> Add Education
//         </button>
//       </div>
//       {educationList.map((edu) => (
//         <div className="resume-block" key={edu.id}>
//           <div className="inner">
//             <span className="name">{edu.initial}</span>
//             <div className="title-box">
//               <div className="info-box">
//                 <h3>{edu.degree}</h3>
//                 <span>{edu.school}</span>
//               </div>
//               <div className="edit-box">
//                 <span className="year">{edu.year}</span>
//                 <div className="edit-btns">
//                   <button>
//                     <span className="la la-pencil"></span>
//                   </button>
//                   <button>
//                     <span className="la la-trash"></span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div className="text">{edu.description}</div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Education;
// import { useState } from "react";

// const Education = () => {
//   const [educationList, setEducationList] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [editFormData, setEditFormData] = useState({});

//   const handleAddEducation = () => {
//     const newEducation = {
//       id: Date.now(),
//       degree: "New Degree",
//       school: "New School",
//       year: "Year",
//       description: "Add description here.",
//       initial: "N",
//     };
//     setEducationList([...educationList, newEducation]);
//   };

//   const handleDeleteEducation = (id) => {
//     setEducationList(educationList.filter((edu) => edu.id !== id));
//   };

//   const handleEditEducation = (edu) => {
//     setEditingId(edu.id);
//     setEditFormData(edu);
//   };

//   const handleSaveEdit = () => {
//     setEducationList(
//       educationList.map((edu) => (edu.id === editingId ? editFormData : edu))
//     );
//     setEditingId(null);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditFormData({ ...editFormData, [name]: value });
//   };

//   return (
//     <div className="resume-outer">
//       <div className="upper-title">
//         <h4>Education</h4>
//         <button className="add-info-btn" onClick={handleAddEducation}>
//           <span className="icon flaticon-plus"></span> Add Education
//         </button>
//       </div>
//       {educationList.map((edu) => (
//         <div className="resume-block" key={edu.id}>
//           <div className="inner">
//             <span className="name">{edu.initial}</span>
//             {editingId === edu.id ? (
//               <div>
//                 <div className="form-group col-lg-6 col-md-12">
//                   <label>Degree</label>
//                   <input
//                     type="text"
//                     name="degree"
//                     value={editFormData.degree}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="form-group col-lg-6 col-md-12">
//                   <label>University/School</label>
//                   <input
//                     type="text"
//                     name="school"
//                     value={editFormData.school}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="form-group col-lg-6 col-md-12">
//                   <label>Year(Duration)</label>
//                   <input
//                     type="text"
//                     name="year"
//                     value={editFormData.year}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="form-group col-lg-6 col-md-12">
//                   <label>Description</label>
//                   <textarea
//                     name="description"
//                     value={editFormData.description}
//                     onChange={handleChange}
//                   ></textarea>
//                 </div>
//                 <button onClick={handleSaveEdit}>Save</button>
//               </div>
//             ) : (
//               <div>
//                 <div className="title-box">
//                   <div className="info-box">
//                     <h3>{edu.degree}</h3>
//                     <span>{edu.school}</span>
//                   </div>
//                   <div className="edit-box">
//                     <span className="year">{edu.year}</span>
//                     <div className="edit-btns">
//                       <button onClick={() => handleEditEducation(edu)}>
//                         <span className="la la-pencil"></span>
//                       </button>
//                       <button onClick={() => handleDeleteEducation(edu.id)}>
//                         <span className="la la-trash"></span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="text">{edu.description}</div>
//               </div>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Education;
// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

// const Education = () => {
//   const [educationList, setEducationList] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [editFormData, setEditFormData] = useState({});
//   const [isAddingNew, setIsAddingNew] = useState(false); // State to manage add new education form visibility
//   const [newEducation, setNewEducation] = useState({
//     degree: "",
//     school: "",
//     year: "",
//     description: "",
//   });

//   useEffect(() => {
//     const fetchEducation = async (user) => {
//       try {
//         const userToken = await user.getIdToken();
//         const response = await axios.get(
//           "https://founders-clinic-backend.onrender.com/api/user/company-profile",
//           {
//             headers: {
//               Authorization: `Bearer ${userToken}`,
//             },
//           }
//         );
//         console.log("response from server", response);

//         const educationData = response.data.profile.educationBackground;
//         if (educationData) {
//           setEducationList(educationData);
//         }
//       } catch (error) {
//         console.error(
//           "Error fetching education data:",
//           error.response?.data || error
//         );
//       }
//     };

//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         fetchEducation(user);
//       } else {
//         console.error("User not authenticated");
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleAddEducation = () => {
//     setIsAddingNew(true); // Show the new education form
//   };

//   const handleSaveNewEducation = async (e) => {
//     e.preventDefault();
//     const newEdu = {
//       id: Date.now(),
//       degree: newEducation.degree,
//       school: newEducation.school,
//       year: newEducation.year,
//       description: newEducation.description,
//       initial: newEducation.school[0],
//     };

//     // Add the new education to the list
//     setEducationList([...educationList, newEdu]);
//     setIsAddingNew(false); // Hide the new education form

//     try {
//       const auth = getAuth();
//       const user = auth.currentUser;
//       const userToken = await user.getIdToken();

//       await axios.patch(
//         "https://founders-clinic-backend.onrender.com/api/user/profile",
//         {
//           profileData: {
//             educationBackground: [...educationList, newEdu],
//           },
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${userToken}`,
//           },
//         }
//       );

//       console.log("Education added successfully");
//     } catch (error) {
//       console.error("Error adding education:", error.response?.data || error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewEducation({ ...newEducation, [name]: value });
//   };

//   const handleDeleteEducation = async (e, educationId) => {
//     e.preventDefault();
//     try {
//       const auth = getAuth();
//       const user = auth.currentUser;
//       const userToken = await user.getIdToken();

//       // Make the API call to delete the specific education entry
//       await axios.patch(
//         "https://founders-clinic-backend.onrender.com/api/user/profile/education",
//         {
//           userId: user.uid, // Provide the user ID
//           educationId, // Pass the education ID directly
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${userToken}`,
//           },
//         }
//       );

//       // Update the frontend list by filtering out the deleted education entry
//       setEducationList(educationList.filter((edu) => edu._id !== educationId));
//       console.log("Education deleted successfully");
//     } catch (error) {
//       console.error("Error deleting education:", error.response?.data || error);
//     }
//   };

//   const handleEditEducation = (e, edu) => {
//     e.preventDefault();
//     setEditingId(edu._id);
//     setEditFormData(edu);
//   };

//   const handleSaveEdit = async (e) => {
//     e.preventDefault();
//     const updatedList = educationList.map((edu) =>
//       edu._id === editingId
//         ? { ...editFormData, initial: editFormData.school[0] }
//         : edu
//     );

//     setEducationList(updatedList);
//     setEditingId(null);

//     try {
//       const auth = getAuth();
//       const user = auth.currentUser;
//       const userToken = await user.getIdToken();

//       await axios.patch(
//         "https://founders-clinic-backend.onrender.com/api/user/profile",
//         {
//           profileData: {
//             educationBackground: updatedList,
//           },
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${userToken}`,
//           },
//         }
//       );

//       console.log("Education updated successfully");
//     } catch (error) {
//       console.error("Error updating education:", error.response?.data || error);
//     }
//   };

//   return (
//     <div className="resume-outer">
//       <div className="upper-title">
//         <h4>Education</h4>
//         <button className="add-info-btn" onClick={handleAddEducation}>
//           <span className="icon flaticon-plus"></span> Add Education
//         </button>
//       </div>

//       {isAddingNew && (
//         <div className="resume-block">
//           <div className="inner">
//             <h3>Add New Education</h3>
//             <div className="form-group col-lg-6 col-md-12">
//               <label>Degree</label>
//               <input
//                 type="text"
//                 name="degree"
//                 value={newEducation.degree}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-group col-lg-6 col-md-12">
//               <label>University/School</label>
//               <input
//                 type="text"
//                 name="school"
//                 value={newEducation.school}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-group col-lg-6 col-md-12">
//               <label>Year</label>
//               <input
//                 type="text"
//                 name="year"
//                 value={newEducation.year}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-group col-lg-6 col-md-12">
//               <label>Description</label>
//               <textarea
//                 name="description"
//                 value={newEducation.description}
//                 onChange={handleChange}
//               ></textarea>
//             </div>
//             <button onClick={handleSaveNewEducation}>Save</button>
//           </div>
//         </div>
//       )}

//       {educationList.map((edu) => (
//         <div className="resume-block" key={edu.id}>
//           <div className="inner">
//             <span className="name">{edu.school[0]}</span>
//             {editingId === edu.id ? (
//               <div>
//                 <div className="form-group col-lg-6 col-md-12">
//                   <label>Degree</label>
//                   <input
//                     type="text"
//                     name="degree"
//                     value={editFormData.degree}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="form-group col-lg-6 col-md-12">
//                   <label>University/School</label>
//                   <input
//                     type="text"
//                     name="school"
//                     value={editFormData.school}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="form-group col-lg-6 col-md-12">
//                   <label>Year(Duration)</label>
//                   <input
//                     type="text"
//                     name="year"
//                     value={editFormData.year}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="form-group col-lg-6 col-md-12">
//                   <label>Description</label>
//                   <textarea
//                     name="description"
//                     value={editFormData.description}
//                     onChange={handleChange}
//                   ></textarea>
//                 </div>
//                 <button onClick={handleSaveEdit}>Save</button>
//               </div>
//             ) : (
//               <div>
//                 <div className="title-box">
//                   <div className="info-box">
//                     <h3>{edu.degree}</h3>
//                     <span>{edu.school}</span>
//                   </div>
//                   <div className="edit-box">
//                     <span className="year">{edu.year}</span>
//                     <div className="edit-btns">
//                       <button onClick={(e) => handleEditEducation(e, edu)}>
//                         <span className="la la-pencil"></span>
//                       </button>
//                       <button
//                         onClick={(e) => handleDeleteEducation(e, edu._id)}
//                       >
//                         <span className="la la-trash"></span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="text">{edu.description}</div>
//               </div>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Education;

"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Education = () => {
  const [educationList, setEducationList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [isAddingNew, setIsAddingNew] = useState(false); // State to manage add new education form visibility
  const [newEducation, setNewEducation] = useState({
    degree: "",
    school: "",
    year: "",
    description: "",
  });

  useEffect(() => {
    const fetchEducation = async (user) => {
      try {
        const userToken = await user.getIdToken();
        const response = await axios.get(
          "https://founders-clinic-backend.onrender.com/api/user/company-profile",
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        console.log("response from server", response);

        const educationData = response.data.profile.educationBackground;
        if (educationData) {
          setEducationList(educationData);
        }
      } catch (error) {
        console.error(
          "Error fetching education data:",
          error.response?.data || error
        );
      }
    };

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchEducation(user);
      } else {
        console.error("User not authenticated");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddEducation = (e) => {
    e.preventDefault();
    setIsAddingNew(true); // Show the new education form
  };

  const handleSaveNewEducation = async (e) => {
    e.preventDefault();
    const newEdu = {
      id: Date.now(),
      degree: newEducation.degree,
      school: newEducation.school,
      year: newEducation.year,
      description: newEducation.description,
      initial: newEducation.school[0],
    };

    // Add the new education to the list
    setEducationList([...educationList, newEdu]);
    setIsAddingNew(false); // Hide the new education form

    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const userToken = await user.getIdToken();

      await axios.patch(
        "https://founders-clinic-backend.onrender.com/api/user/profile",
        {
          profileData: {
            educationBackground: [...educationList, newEdu],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      console.log("Education added successfully");
    } catch (error) {
      console.error("Error adding education:", error.response?.data || error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEducation({ ...newEducation, [name]: value });
  };

  const handleDeleteEducation = async (e, educationId) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const userToken = await user.getIdToken();

      // Make the API call to delete the specific education entry
      await axios.patch(
        "https://founders-clinic-backend.onrender.com/api/user/profile/intern-education",
        {
          userId: user.uid, // Provide the user ID
          educationId, // Pass the education ID directly
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      // Update the frontend list by filtering out the deleted education entry
      setEducationList(educationList.filter((edu) => edu._id !== educationId));
      console.log("Education deleted successfully");
    } catch (error) {
      console.error("Error deleting education:", error.response?.data || error);
    }
  };

  const handleEditEducation = (e, edu) => {
    e.preventDefault();
    setEditingId(edu._id);
    setEditFormData(edu);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    const updatedList = educationList.map((edu) =>
      edu._id === editingId
        ? { ...editFormData, initial: editFormData.school[0] }
        : edu
    );

    setEducationList(updatedList);
    setEditingId(null);

    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const userToken = await user.getIdToken();

      await axios.patch(
        "https://founders-clinic-backend.onrender.com/api/user/profile",
        {
          profileData: {
            educationBackground: updatedList,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      console.log("Education updated successfully");
    } catch (error) {
      console.error("Error updating education:", error.response?.data || error);
    }
  };

  return (
    <div className="resume-outer">
      <div className="upper-title">
        <h4>Education</h4>
        <button className="add-info-btn" onClick={handleAddEducation}>
          <span className="icon flaticon-plus"></span> Add Education
        </button>
      </div>

      {isAddingNew && (
        <div className="resume-block">
          <div className="inner">
            <h3>Add Education</h3>
            <div className="form-group col-lg-6 col-md-12">
              <label>Degree</label>
              <input
                type="text"
                name="degree"
                value={newEducation.degree}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-lg-6 col-md-12">
              <label>University/School</label>
              <input
                type="text"
                name="school"
                value={newEducation.school}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-lg-6 col-md-12">
              <label>Year</label>
              <input
                type="text"
                name="year"
                value={newEducation.year}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-lg-6 col-md-12">
              <label>Description</label>
              <textarea
                name="description"
                value={newEducation.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <button onClick={handleSaveNewEducation}>Save</button>
          </div>
        </div>
      )}

      {educationList.map((edu) => (
        <div className="resume-block" key={edu.id}>
          <div className="inner">
            <span className="name">{edu.school[0]}</span>
            {editingId === edu.id ? (
              <div>
                <div className="form-group col-lg-6 col-md-12">
                  <label>Degree</label>
                  <input
                    type="text"
                    name="degree"
                    value={editFormData.degree}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group col-lg-6 col-md-12">
                  <label>University/School</label>
                  <input
                    type="text"
                    name="school"
                    value={editFormData.school}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group col-lg-6 col-md-12">
                  <label>Year(Duration)</label>
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
                    <h3>{edu.degree}</h3>
                    <span>{edu.school}</span>
                  </div>
                  <div className="edit-box">
                    <span className="year">{edu.year}</span>
                    <div className="edit-btns">
                      <button onClick={(e) => handleEditEducation(e, edu)}>
                        <span className="la la-pencil"></span>
                      </button>
                      <button
                        onClick={(e) => handleDeleteEducation(e, edu._id)}
                      >
                        <span className="la la-trash"></span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text">{edu.description}</div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Education;
