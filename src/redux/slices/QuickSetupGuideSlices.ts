import { createSlice } from "@reduxjs/toolkit";

export const quickSetupGuideSlice = createSlice({
  name: "quickSetupGuide",
  initialState: {
    step: parseInt(localStorage.getItem("donor_step") || "1", 10),
    showEduMaterialSpecScreen: false,
    abortEduMaterialSpecScreen: false
  },
  reducers: {
    updateStep: (state, action) => {
      state.step = action.payload;
      localStorage.setItem("donor_step", action.payload);
    },
    showEduMaterialSpecScreen: (state, action) => {
      state.showEduMaterialSpecScreen = action.payload;
    },
    abortEduMaterialSpecScreen: (state, action) => {
      state.abortEduMaterialSpecScreen = action.payload;
    }
  }
});

export const {
  updateStep,
  showEduMaterialSpecScreen,
  abortEduMaterialSpecScreen
} = quickSetupGuideSlice.actions;

export const selectStep = (state: any) => state.quickSetupGuide.step;
export default quickSetupGuideSlice.reducer;
