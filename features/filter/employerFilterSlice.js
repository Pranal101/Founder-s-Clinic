// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     keyword: "",
//     location: "",
//     destination: {
//         min: 0,
//         max: 100,
//     },
//     category: "",
//     companySize: "",
//     foundationDate: {
//         min: 1900,
//         max: 2028,
//     },
//     sort: "",
//     perPage: {
//         start: 0,
//         end: 0,
//     },
// };

// export const employerFilterSlice = createSlice({
//     name: "employer-filter",
//     initialState,
//     reducers: {
//         addKeyword: (state, { payload }) => {
//             state.keyword = payload;
//         },
//         addLocation: (state, { payload }) => {
//             state.location = payload;
//         },
//         addDestination: (state, { payload }) => {
//             state.destination.min = payload.min;
//             state.destination.max = payload.max;
//         },
//         addCategory: (state, { payload }) => {
//             state.category = payload;
//         },
//         addFoundationDate: (state, { payload }) => {
//             state.foundationDate.min = payload.min;
//             state.foundationDate.max = payload.max;
//         },
//         addSort: (state, { payload }) => {
//             state.sort = payload;
//         },
//         addPerPage: (state, { payload }) => {
//             state.perPage.start = payload.start;
//             state.perPage.end = payload.end;
//         },
//     },
// });

// export const {
//     addKeyword,
//     addLocation,
//     addDestination,
//     addCategory,
//     addFoundationDate,
//     addSort,
//     addPerPage,
// } = employerFilterSlice.actions;
// export default employerFilterSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  keyword: "",
  location: "",
  budget: {
    min: 0,
    max: 2000000, // Updated to ensure job with 12000 budget is visible
  },
  skillsRequired: [],
  experience: {
    min: 0,
    max: 20,
  },
  genderPreference: "",
  supportDuration: {
    min: 0,
    max: 24, // Extended to include "Long-term support"
  },
  sort: "",
  perPage: {
    start: 0,
    end: 12,
  },
  budgetFlexibility: "",
  expectedStartDate: {
    from: null,
    to: null,
  },
  completionTimeline: {
    from: null,
    to: null,
  },
  postedDate: {
    from: null,
    to: null,
  },
};

export const employerFilterSlice = createSlice({
  name: "employer-filter", // Updated slice name
  initialState,
  reducers: {
    addKeyword: (state, { payload }) => {
      state.keyword = payload;
    },
    addLocation: (state, { payload }) => {
      state.location = payload;
    },
    addBudget: (state, { payload }) => {
      state.budget.min = payload.min;
      state.budget.max = payload.max;
    },
    addSkillsRequired: (state, { payload }) => {
      state.skillsRequired = payload;
    },
    addExperience: (state, { payload }) => {
      state.experience.min = payload.min;
      state.experience.max = payload.max;
    },
    addGenderPreference: (state, { payload }) => {
      state.genderPreference = payload;
    },
    addSupportDuration: (state, { payload }) => {
      state.supportDuration.min = payload.min;
      state.supportDuration.max = payload.max;
    },
    addSort: (state, { payload }) => {
      state.sort = payload;
    },
    addPerPage: (state, { payload }) => {
      state.perPage.start = payload.start;
      state.perPage.end = payload.end;
    },
    addBudgetFlexibility: (state, { payload }) => {
      state.budgetFlexibility = payload;
    },
    setExpectedStartDateRange: (state, { payload }) => {
      state.expectedStartDate.from = payload.from;
      state.expectedStartDate.to = payload.to;
    },
    setCompletionTimelineRange: (state, { payload }) => {
      state.completionTimeline.from = payload.from;
      state.completionTimeline.to = payload.to;
    },
    setPostedDateRange: (state, { payload }) => {
      state.postedDate.from = payload.from;
      state.postedDate.to = payload.to;
    },
  },
});

export const {
  addKeyword,
  addLocation,
  addBudget,
  addSkillsRequired,
  addExperience,
  addGenderPreference,
  addSupportDuration,
  addSort,
  addPerPage,
  addBudgetFlexibility,
  setExpectedStartDateRange,
  setCompletionTimelineRange,
  setPostedDateRange,
} = employerFilterSlice.actions;

export default employerFilterSlice.reducer;
