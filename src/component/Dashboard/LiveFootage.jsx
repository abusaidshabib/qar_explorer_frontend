import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { CiCamera } from "react-icons/ci";
import cam from "../../assets/logo/dummyCam.png";
import cameraIcon from "../../assets/icons/cctv-camera.png";
import cameraIconAlt from "../../assets/icons/cctv-camera-alt.png";
import { useDispatch, useSelector } from "react-redux";
import MQTTReceiver from "../MQTTReceiver";
import SelectCameraList from "../../pages/settings/CameraSettings.jsx/SelectCameraList";
import mqtt from "mqtt";
import { useEffect, useState } from "react";
import { setLive } from "../../redux/slices/mqtt";
import TentCameraList from "../TentCameraList";

const LiveFootage = () => {
  const mode = useSelector((state) => state.global.mode);
  const { selectedCameras } = useSelector((state) => state.camera);
  const { mqttBrokerUrl, isLive } = useSelector((state) => state.mqtt);
  const dispatch = useDispatch();

  console.log("ip_address", selectedCameras?.ip_address);

  // const jsonData = {
  //   live: isLive,
  // };

  // const mqttTopic = `settings_${selectedCameras?.sn}`;
  // const responseTopic = `settings_${selectedCameras?.sn}_response`;

  // const handleLive = () => {
  //   if (mqttBrokerUrl && mqttTopic) {
  //     console.log(mqttBrokerUrl);
  //     const client = mqtt.connect(mqttBrokerUrl);
  //     console.log("topic", mqttTopic);
  //     const message = JSON.stringify(jsonData);

  //     client.on("connect", () => {
  //       console.log(`Connected to MQTT broker for topic: ${responseTopic}`);
  //       client.subscribe(responseTopic);
  //     });

  //     client.publish(mqttTopic, message);

  //     client.on("message", (topic, message) => {
  //       if (topic === responseTopic) {
  //         console.log("Received response:", JSON.parse(message.toString()));
  //       }
  //     });

  //     client.on("error", (error) => {
  //       console.error("MQTT connection error:", error);
  //     });

  //     client.on("close", () => {
  //       console.log("MQTT connection closed");
  //     });

  //     return () => {
  //       client.end(); // Disconnect from MQTT broker on component unmount
  //     };
  //   }
  // };

  // useEffect(() => {
  //   if (selectedCameras) {
  //     handleLive();
  //   }
  // }, [isLive, selectedCameras]);

  return (
    <div className="bg-bgalt text-text max-w-[900px] w-full space-y-2 p-4 rounded-lg">
      <div className="flex flex-row items-center gap-2">
        <div
          className={`p-3 rounded-full text-secondari ${
            mode === "hajj1" ? "bg-[rgb(27,37,75)]" : "bg-[rgb(244,247,254)]"
          }`}
        >
          {mode === "hajj" ? (
            <img src={cameraIcon} alt="cameraIcon" width={30} />
          ) : (
            <img src={cameraIconAlt} alt="cameraIcon" width={30} />
          )}
        </div>
        <div className="flex flex-1 justify-center gap-4">
          <Button color="danger">
            Live
          </Button>
          <TentCameraList />
        </div>
      </div>
      {/* {isLive && <MQTTReceiver />} */}
      <MQTTReceiver />
      {/* {!isLive && (
        <div className="w-full flex flex-row justify-center">
          <p>Click Live Button to see the live stream</p>
        </div>
      )} */}
    </div>
  );
};

export default LiveFootage;
