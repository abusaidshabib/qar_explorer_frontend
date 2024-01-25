/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import mqtt from "mqtt";
import { useSelector } from "react-redux";

const MQTTReceiver = () => {
  const { mqttBrokerUrl } = useSelector(
    (state) => state.camera
  );
  console.log(mqttBrokerUrl);
  const { selectedCameras } = useSelector((state) => state.camera);
  const [frame, setFrame] = useState(null);

  const topic = `live_${selectedCameras?.sn}`;

  useEffect(() => {
    if (mqttBrokerUrl && topic) {
      const client = mqtt.connect(mqttBrokerUrl);

      client.on("connect", () => {
        console.log(`Connected to MQTT broker for topic: ${topic}`);
        client.subscribe(topic);
      });

      client.on("message", (mqttTopic, message) => {
        if (mqttTopic === topic) {
          const nparr = new Uint8Array(message);

          const chunkSize = 1024; // Adjust the chunk size as needed
          let base64String = "";

          for (let i = 0; i < nparr.length; i += chunkSize) {
            const chunk = nparr.slice(i, i + chunkSize);
            const uint8Array = new Uint8Array(chunk);
            base64String += btoa(String.fromCharCode.apply(null, uint8Array));
          }
          const imageSrc = `data:image/jpeg;base64,${message}`;
          console.log("imageSrc:", imageSrc)
          setFrame(imageSrc);
        }
      });

      client.on("error", (error) => {
        console.error("MQTT connection error:", error);
      });

      client.on("close", () => {

        console.log("MQTT Live Stream connection closed");
      });

      return () => {
        client.end(); // Disconnect from MQTT broker on component unmount
      };
    }
  }, [topic, mqttBrokerUrl]);

  return frame && <img src={frame} style={{
    height: 500,
    width: 900,
  }} alt="Video Stream" />;
};

export default MQTTReceiver;
