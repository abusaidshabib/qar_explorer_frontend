import { configureStore } from "@reduxjs/toolkit";
import hajjApi from "../apis/hajjApi";
import globalSlice from "../slices/global";
import languageSlice from "../slices/language";
import authSlice from "../slices/auth";
import tentSlice from "../slices/tent";
import cameraSlice from "../slices/camer";
import userSlice from "../slices/user";
import mqttSlice from "../slices/mqtt";
import fineTuningSlice from "../slices/fineTuning";

const store = configureStore({
  reducer: {
    [hajjApi.reducerPath]: hajjApi.reducer,
    [globalSlice.name]: globalSlice.reducer,
    [languageSlice.name]: languageSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [tentSlice.name]: tentSlice.reducer,
    [cameraSlice.name]: cameraSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [mqttSlice.name]: mqttSlice.reducer,
    [fineTuningSlice.name]: fineTuningSlice.reducer,
  },
  middleware: (getDefaultMiddlewares) => {
    return getDefaultMiddlewares().concat(hajjApi.middleware);
  },
  devTools: !import.meta.env.PROD,
});

export default store;
