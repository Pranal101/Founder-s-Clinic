"use client";
import { useState } from "react";

const FormInfoBox = () => {
  const [isLookingForInvestment, setIsLookingForInvestment] = useState(null);

  const handleInvestmentChange = (e) => {
    setIsLookingForInvestment(e.target.value === "yes");
  };

  const catOptions = [
    { value: "Banking", label: "Banking" },
    { value: "Digital & Creative", label: "Digital & Creative" },
    { value: "Retail", label: "Retail" },
    { value: "Human Resources", label: "Human Resources" },
    { value: "Management", label: "Management" },
    { value: "Accounting & Finance", label: "Accounting & Finance" },
    { value: "Digital", label: "Digital" },
    { value: "Creative Art", label: "Creative Art" },
  ];

  return (
    <form className="default-form">
      <div className="row">
        <div className="form-group col-lg-6 col-md-12">
          <label>Are you looking for an investment?</label>
          <select
            className="chosen-single form-select"
            onChange={handleInvestmentChange}
          >
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {isLookingForInvestment && (
          <div className="form-group col-lg-6 col-md-12">
            <label>Investment Amount</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter amount"
            />
          </div>
        )}

        <div className="form-group col-lg-12 col-md-12">
          <button type="submit" className="theme-btn btn-style-one">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormInfoBox;
