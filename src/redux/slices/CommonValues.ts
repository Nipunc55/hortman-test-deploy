import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { COMMON_VALUES, type CommonInitialState } from "../types/CommonValues";

const initialState: CommonInitialState = {
  questionOneReviewSectionViewed: false,
  questionTwoReviewSectionViewed: false
};

export const commonValuesSlice = createSlice({
  name: COMMON_VALUES,
  initialState,
  reducers: {
    updateQuestionOneReviewValue: (state, action: PayloadAction<boolean>) => {
      state.questionOneReviewSectionViewed = action.payload;
    },
    updateQuestionTwoReviewValue: (state, action: PayloadAction<boolean>) => {
      state.questionTwoReviewSectionViewed = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { updateQuestionOneReviewValue, updateQuestionTwoReviewValue } =
  commonValuesSlice.actions;
// You must export the reducer as follows for it to be able to be read by the store.
export default commonValuesSlice.reducer;
