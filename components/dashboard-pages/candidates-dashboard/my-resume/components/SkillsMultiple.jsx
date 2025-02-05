// 'use client'

// import Select from "react-select";

// const SkillsMultiple = () => {
//   const catOptions = [
//     { value: "Banking", label: "Banking" },
//     { value: "Digital & Creative", label: "Digital & Creative" },
//     { value: "Retail", label: "Retail" },
//     { value: "Human Resources", label: "Human Resources" },
//     { value: "Managemnet", label: "Managemnet" },
//     { value: "Accounting & Finance", label: "Accounting & Finance" },
//     { value: "Digital", label: "Digital" },
//     { value: "Creative Art", label: "Creative Art" },
//   ];

//   return (
//     <Select
//       defaultValue={[catOptions[1]]}
//       isMulti
//       name="colors"
//       options={catOptions}
//       className="basic-multi-select"
//       classNamePrefix="select"
//       required
//     />
//   );
// };

// export default SkillsMultiple;
// "use client";
// import CreatableSelect from "react-select/creatable";
// import { useState, useEffect } from "react";
// import axios from "axios";

// const SkillsMultiple = () => {
//   const [skillOptions, setSkillOptions] = useState([]);
//   const [selectedSkills, setSelectedSkills] = useState([]);

//   // Fetch skills array from the backend
//   useEffect(() => {
//     const fetchSkills = async () => {
//       try {
//         const response = await axios.get(
//           "http://13.126.254.235:4000/api/user/skills" // Adjust the URL as per your API route
//         );
//         const skills = response.data.map((skill) => ({
//           value: skill,
//           label: skill,
//         }));
//         setSkillOptions(skills);
//       } catch (error) {
//         console.error("Error fetching skills:", error.response?.data || error);
//       }
//     };

//     fetchSkills();
//   }, []);

//   // Handle skill creation or selection
//   const handleSkillChange = async (selectedOptions) => {
//     const normalizedSkills = selectedOptions.map((skill) => ({
//       value: skill.value.trim().toLowerCase(),
//       label: skill.label,
//     }));

//     setSelectedSkills(normalizedSkills);

//     const newSkills = normalizedSkills.filter(
//       (skill) => !skillOptions.find((option) => option.value === skill.value)
//     );

//     if (newSkills.length > 0) {
//       try {
//         const response = await axios.post(
//           "http://13.126.254.235:4000/api/user/add-skills",
//           {
//             skills: newSkills.map((skill) => skill.value),
//           }
//         );
//         const updatedSkills = response.data.map((skill) => ({
//           value: skill,
//           label: skill,
//         }));
//         setSkillOptions(updatedSkills);
//         console.log("New skills added successfully");
//       } catch (error) {
//         console.error(
//           "Error adding new skills:",
//           error.response?.data || error
//         );
//       }
//     }
//   };

//   return (
//     <CreatableSelect
//       isMulti
//       options={skillOptions}
//       value={selectedSkills}
//       onChange={handleSkillChange}
//       className="basic-multi-select"
//       classNamePrefix="select"
//       placeholder="Select or create skills..."
//     />
//   );
// };

// export default SkillsMultiple;
"use client";

import { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const SkillsMultiple = () => {
  const [globalSkills, setGlobalSkills] = useState([]); // Global skills array
  const [userSkills, setUserSkills] = useState([]); // User-specific skills
  const [userToken, setUserToken] = useState(""); // Token for authenticated requests

  // Set up Firebase authentication listener
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setUserToken(token);
      } else {
        console.error("User not authenticated");
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch global and user-specific skills
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        // Fetch global skills
        const globalResponse = await axios.get(
          "http://13.126.254.235:4000/api/user/skills"
        );
        const globalSkillOptions = globalResponse.data.map((skill) => ({
          value: skill,
          label: skill,
        }));
        setGlobalSkills(globalSkillOptions);

        if (userToken) {
          // Fetch user-specific skills
          const userResponse = await axios.get(
            "http://13.126.254.235:4000/api/user/user-skills",
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          );
          const userSkillOptions = userResponse.data.map((skill) => ({
            value: skill,
            label: skill,
          }));
          setUserSkills(userSkillOptions);
        }
      } catch (error) {
        console.error("Error fetching skills:", error.response?.data || error);
      }
    };

    if (userToken) {
      fetchSkills();
    }
  }, [userToken]);

  // Handle skill selection/creation
  const handleSkillChange = async (selectedOptions) => {
    const selectedSkillValues = selectedOptions.map((skill) => skill.value); // Extract selected skill values
    const previousSkillValues = userSkills.map((skill) => skill.value); // Get the previous skill values

    const newSkills = selectedOptions.filter(
      (skill) =>
        !globalSkills.find((globalSkill) => globalSkill.value === skill.value)
    ); // New skills to add
    const removedSkills = previousSkillValues.filter(
      (skill) => !selectedSkillValues.includes(skill)
    ); // Skills to remove

    setUserSkills(selectedOptions); // Update the UI

    try {
      if (selectedSkillValues.length > 0) {
        // Update the user's skill list with all selected skills
        await axios.post(
          "http://13.126.254.235:4000/api/user/add-user-skills",
          {
            skills: selectedSkillValues,
          },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
      }

      if (removedSkills.length > 0) {
        // Remove skills from the user's skill list
        await axios.post(
          "http://13.126.254.235:4000/api/user/remove-user-skills",
          {
            skills: removedSkills,
          },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
      }

      // Add newly created skills to the global list
      if (newSkills.length > 0) {
        setGlobalSkills((prev) => [...prev, ...newSkills]);
      }
    } catch (error) {
      console.error(
        "Error updating user-specific skills:",
        error.response?.data || error
      );
    }
  };

  return (
    <CreatableSelect
      isMulti
      options={globalSkills} // Dropdown shows global skills
      value={userSkills} // Pre-selected user-specific skills
      onChange={handleSkillChange}
      className="basic-multi-select"
      classNamePrefix="select"
      placeholder="Select or create skills..."
    />
  );
};

export default SkillsMultiple;
