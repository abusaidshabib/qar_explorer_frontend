import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCameras: undefined,
  allCamera: undefined,
  mqttBrokerUrl: "",
};

const cameraSlice = createSlice({
  name: "camera",
  initialState,
  reducers: {
    setSelectedCameras: (state, action) => {
      if (action.payload) {
        state.selectedCameras = state.allCamera.filter(
          (data) => action.payload == data.id
        )[0];
        state.mqttBrokerUrl = 
        // "ws://0.tcp.in.ngrok.io:15472/mqtt"
        `ws://${
          state.selectedCameras?.ip_address.includes("ngrok")
            ? state.selectedCameras?.ip_address
            : `${state.selectedCameras?.ip_address}:9001`
        }/mqtt`;
      }
    },
    setAllCamera: (state, action) => {
      state.allCamera = action?.payload?.slice()?.sort((a, b) => {
        if (a.sn < b.sn) {
          return -1;
        } else if (a.sn == b.sn) {
          return 0;
        } else {
          return 1;
        }
      });
      if (!state.selectedCameras) {
        state.selectedCameras = state?.allCamera[0];
        state.mqttBrokerUrl = 
        // "ws://0.tcp.in.ngrok.io:15472/mqtt"
        `ws://${
          state.selectedCameras?.ip_address.includes("ngrok")
            ? state.selectedCameras?.ip_address
            : `${state.selectedCameras?.ip_address}:9001`
        }/mqtt`;
      }
    },
  },
});

export default cameraSlice;
export const { setSelectedCameras, setAllCamera } = cameraSlice.actions;
