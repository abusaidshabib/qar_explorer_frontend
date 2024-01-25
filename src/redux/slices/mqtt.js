import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mqttTopic: "live_headcount1", // Adjust the topic accordingly
  mqttBrokerUrl: "", // "0.tcp.in.ngrok.io:18888"; // Adjust the broker URL accordingly
  isLive: false,
};
// http://0.tcp.in.ngrok.io:13912
const mqttSlice = createSlice({
    name: "mqtt",
    initialState,
    reducers:{
      setLive: (state, action) => {
        state.isLive = !state.isLive;
      },
    }
});

export default mqttSlice;

export const {setLive} = mqttSlice.actions;