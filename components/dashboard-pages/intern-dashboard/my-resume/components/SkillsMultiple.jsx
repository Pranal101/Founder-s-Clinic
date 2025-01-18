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
"use client";
import CreatableSelect from "react-select/creatable";
import { useState, useEffect } from "react";
import axios from "axios";

const SkillsMultiple = () => {
  const [skillOptions, setSkillOptions] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  // Fetch skills array from the backend
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(
          "https://founders-clinic-backend.onrender.com/api/user/skills" // Adjust the URL as per your API route
        );
        const skills = response.data.map((skill) => ({
          value: skill,
          label: skill,
        }));
        setSkillOptions(skills);
      } catch (error) {
        console.error("Error fetching skills:", error.response?.data || error);
      }
    };

    fetchSkills();
  }, []);

  // Handle skill creation or selection
  const handleSkillChange = async (selectedOptions) => {
    const normalizedSkills = selectedOptions.map((skill) => ({
      value: skill.value.trim().toLowerCase(),
      label: skill.label,
    }));

    setSelectedSkills(normalizedSkills);

    const newSkills = normalizedSkills.filter(
      (skill) => !skillOptions.find((option) => option.value === skill.value)
    );

    if (newSkills.length > 0) {
      try {
        const response = await axios.post(
          "https://founders-clinic-backend.onrender.com/api/user/add-skills",
          {
            skills: newSkills.map((skill) => skill.value),
          }
        );
        const updatedSkills = response.data.map((skill) => ({
          value: skill,
          label: skill,
        }));
        setSkillOptions(updatedSkills);
        console.log("New skills added successfully");
      } catch (error) {
        console.error(
          "Error adding new skills:",
          error.response?.data || error
        );
      }
    }
  };

  return (
    <CreatableSelect
      isMulti
      options={skillOptions}
      value={selectedSkills}
      onChange={handleSkillChange}
      className="basic-multi-select"
      classNamePrefix="select"
      placeholder="Select or create skills..."
    />
  );
};

export default SkillsMultiple;
