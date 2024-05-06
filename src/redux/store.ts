import { configureStore } from "@reduxjs/toolkit";
// This is how you import a reducer, based on the prior export.
import questionsReducer, { resetState } from "./slices/Questions";
import questionsTwoReducer, { resetStateTwo } from "./slices/QuestionsTwo";
import loginReducer from "./slices/login";
import commonValuesReducer from "./slices/CommonValues";
import quickSetupReducer from "./slices/QuickSetupGuideSlices";

const store = configureStore({
  reducer: {
    // You are free to call the LHS what you like, but it must have a reducer on the RHS.
    questionsReducer,
    questionsTwoReducer,
    loginReducer,
    commonValuesReducer,
    quickSetupReducer,
    resetState,
    resetStateTwo
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
