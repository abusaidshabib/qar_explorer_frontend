import { useDispatch, useSelector } from "react-redux";
// import DrawRectangle from "./DrawRectangle";
import SelectCameraList from "./SelectCameraList";
import { Button, Input, Radio, RadioGroup, Spinner } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
// import streamImage from "../../../assets/logo/stream.jpg";
import LineTo from "react-lineto";
import MQTTReceiver from "../../../component/MQTTReceiver";
import mqtt from "mqtt";
import { setLive } from "../../../redux/slices/mqtt";

const CameraSettings = () => {
  const { selectedCameras, mqttBrokerUrl } = useSelector((state) => state.camera);
  const { tentList } = useSelector((state) => state.tent);
  const { isLive } = useSelector((state) => state.mqtt);
  const { words, lang } = useSelector((state) => state.language);
  const streamRef = useRef(null);
  const dispatch = useDispatch();
  const [select, setSelect] = useState("");
  const [polygon, setPolygon] = useState("rectangle");
  const [dimentaion, setDimention] = useState({
    width: 0,
    height: 0,
  });
  const tent = tentList?.filter(
    (tentData) => tentData?.id == selectedCameras?.tent
  )[0];
  const [editAble, setEditAble] = useState(false);
  const [line1, setLine1] = useState({
    x1: 0,
    y1: 0.55,
    x2: 0.99,
    y2: 0.55,
  });
  const [line2, setLine2] = useState({
    x1: 0,
    y1: 0.65,
    x2: 0.99,
    y2: 0.65,
  });
  const [rec, setRec] = useState({
    x1: 0,
    y1: 0,
    x2: 1,
    y2: 1,
  });
  const [updatedRec, setUpdatedRec] = useState({
    x1: 0,
    y1: 0,
    x2: 1,
    y2: 1,
  });

  useEffect(() => {
    if (streamRef?.current) {
      setDimention({
        height: streamRef?.current?.offsetHeight,
        width: streamRef?.current?.offsetWidth,
      });
    }
  }, [streamRef?.current]);

  useEffect(() => {
    const ara = [
      { x: rec.x1, y: rec.y1 },
      { x: rec.x2, y: rec.y2 },
    ];
    ara.sort((a, b) => {
      if (a.x != b.x) {
        return a.x - b.x;
      } else {
        return a.y - b.y;
      }
    });
    setUpdatedRec((prev) => {
      return {
        ...prev,
        x1: ara[0].x,
        y1: ara[0].y,
        x2: ara[1].x,
        y2: ara[1].y,
      };
    });
  }, [rec]);

  const handlePoint = (point) => {
    if (editAble && select != "") {
      if (polygon == "line1") {
        const splitedData = select.split("_");
        const x = `x${splitedData[2]}`;
        const y = `y${splitedData[2]}`;
        console.log(x, y);
        setLine1((prev) => {
          return {
            ...prev,
            [x]: Math.max((point.x / dimentaion.width).toPrecision(2),0),
            [y]: Math.max((point.y / dimentaion.height).toPrecision(2),0),
          };
        });
      } else if (polygon == "line2") {
        const splitedData = select.split("_");
        const x = `x${splitedData[2]}`;
        const y = `y${splitedData[2]}`;
        console.log(x, y);
        setLine2((prev) => {
          return {
            ...prev,
            [x]: Math.max((point.x / dimentaion.width).toPrecision(2),0),
            [y]: Math.max((point.y / dimentaion.height).toPrecision(2),0),
          };
        });
      } else if (polygon == "rectangle") {
        const splitedData = select.split("_");
        const x = `x${splitedData[2]}`;
        const y = `y${splitedData[2]}`;
        console.log(x, y);
        setRec((prev) => {
          return {
            ...prev,
            [x]: Math.max((point.x / dimentaion.width).toPrecision(2),0),
            [y]: Math.max((point.y / dimentaion.height).toPrecision(2),0),
          };
        });
      }
    }
  };

  const settingsData = {
    settings_requested: true,
  };
  const mqttTopic = `settings_${selectedCameras?.sn}`;
  const responseTopic = `settings_${selectedCameras?.sn}_response`;

  const publishJsonData = () => {
    if ((mqttBrokerUrl, mqttTopic)) {
      const client = mqtt.connect(mqttBrokerUrl);
      console.log("topic", mqttTopic);
      const message = JSON.stringify(settingsData);

      client.on("connect", () => {
        console.log(`Connected to MQTT broker for topic: ${responseTopic}`);
        client.subscribe(responseTopic);
      });

      client.publish(mqttTopic, message);

      client.on("message", (topic, message) => {
        if (topic === responseTopic) {
          console.log("Received response:", JSON.parse(message.toString()));
          const setting_data = JSON.parse(message.toString());
          console.log(setting_data);
          setRec({
            x1: setting_data.rx1,
            x2: setting_data.rx2,
            y1: setting_data.ry1,
            y2: setting_data.ry2,
          });
          setLine1({
            x1: setting_data.l1x1,
            y1: setting_data.l1y1,
            x2: setting_data.l1x2,
            y2: setting_data.l1y2,
          });
          setLine2({
            x1: setting_data.l2x1,
            y1: setting_data.l2y1,
            x2: setting_data.l2x2,
            y2: setting_data.l2y2,
          });
        }
      });

      client.on("error", (error) => {
        console.error("MQTT connection error:", error);
      });

      client.on("close", () => {
        console.log("MQTT connection closed");
      });

      return () => {
        client.end(); // Disconnect from MQTT broker on component unmount
      };
    }
  };
  useEffect(() => {
    if (selectedCameras) {
      publishJsonData();
    }
  }, [selectedCameras]);

  const handleApply = () => {
    const settingsJSON = {
      rx1: Number(rec.x1),
      ry1: Number(rec.y1),
      rx2: Number(rec.x2),
      ry2: Number(rec.y2),
      l1x1: Number(line1.x1),
      l1y1: Number(line1.y1),
      l1x2: Number(line1.x2),
      l1y2: Number(line1.y2),
      l2x1: Number(line2.x1),
      l2y1: Number(line2.y1),
      l2x2: Number(line2.x2),
      l2y2: Number(line2.y2),
    };

    if ((mqttBrokerUrl, mqttTopic)) {
      const client = mqtt.connect(mqttBrokerUrl);
      console.log("topic", mqttTopic);
      const message = JSON.stringify(settingsJSON);

      client.on("connect", () => {
        console.log(`Connected to MQTT broker for topic: ${responseTopic}`);
        client.subscribe(responseTopic);
      });

      client.publish(mqttTopic, message);

      // client.on("message", (topic, message) => {
      //   if (topic === responseTopic) {
      //     console.log("Received response:", JSON.parse(message.toString()));
      //     publishJsonData()
      //   }
      // });

      // client.on("error", (error) => {
      //   console.error("MQTT connection error:", error);
      // });

      // client.on("close", () => {
      //   console.log("MQTT connection closed");
      // });

      return () => {
        client.end(); // Disconnect from MQTT broker on component unmount
      };
    }
  };

  // const liveData = {
  //   live: isLive,
  // };

  // const handleLive = () => {
  //   if (mqttBrokerUrl && mqttTopic) {
  //     console.log(mqttBrokerUrl);
  //     const client = mqtt.connect(mqttBrokerUrl);
  //     console.log("topic", mqttTopic);
  //     const message = JSON.stringify(liveData);

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
    <div dir="rtl">
      <SelectCameraList />
      <div className="flex flex-row pt-4">
        {/* Settings */}
        <div className="w-[460px] bg-background flex flex-col items-center py-4 px-6 rounded-lg">
          <div className="space-y-4">
            {/* Camera SN */}
            <div dir="rtl">
              <p className="text-lg font-semibold flex justify-between">
                <Button
                  color="danger"
                  
                >
                  Live
                </Button>
                {words["Serial No."][lang]}: {selectedCameras?.sn}
              </p>
            </div>
            {/* Camera Tent */}
            <div dir="rtl">
              <p className="text-lg font-semibold">
                {words["tent"][lang]}:{" "}
                <span className="border-1 cursor-pointer border-text px-2 py-1 rounded-lg">
                  {tent?.name}
                </span>
              </p>
            </div>
            {/* Radio Group */}
            <div className="flex flex-col items-end">
              <p className="text-lg font-semibold underline">
                {words["Detection Zone"][lang]}
              </p>
              <RadioGroup
                dir="ltr"
                classNames={{
                  wrapper: ["flex-row"],
                }}
                className="pt-2"
                value={polygon}
                onValueChange={setPolygon}
                onChange={() => setSelect("")}
                isDisabled={!editAble}
              >
                <Radio value={"rectangle"}>
                  <p className="text-text">Rectangle</p>
                </Radio>
                {/* <Radio value={"polygon"}>
                  <p className="text-text">Polygon</p>
                </Radio> */}
                <Radio value={"line1"}>
                  <p className="text-text">Line 1</p>
                </Radio>
                <Radio value={"line2"}>
                  <p className="text-text">Line 2</p>
                </Radio>
              </RadioGroup>
              {/* Rectangle */}
              <div className="pt-2">
                {editAble ? (
                  <p>{words["Edit Here for Rectangle"][lang]}</p>
                ) : (
                  <p className="text-gray-500">
                    {words["Edit Here for Rectangle"][lang]}
                  </p>
                )}
                <div
                  className="flex flex-row w-full justify-around gap-3"
                  dir="ltr"
                >
                  <div className="flex flex-col items-center">
                    <div className="flex flex-row gap-2 border-b-1 border-text">
                      <div className="flex flex-col items-center">
                        <Input
                          dir="ltr"
                          value={rec.x1}
                          disabled={Boolean(
                            !editAble || polygon != "rectangle"
                          )}
                          onChange={(e) => {
                            setRec((prev) => {
                              return {
                                ...prev,
                                x1: Math.max(e.target.value,0),
                              };
                            });
                          }}
                        />
                        <p className="pt-2">X1</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <Input
                          dir="ltr"
                          value={rec.y1}
                          disabled={Boolean(
                            !editAble || polygon != "rectangle"
                          )}
                          onChange={(e) => {
                            setRec((prev) => {
                              return {
                                ...prev,
                                y1: Math.max(e.target.value,0),
                              };
                            });
                          }}
                        />
                        <p className="pt-2">Y1</p>
                      </div>
                    </div>
                    <p>Point 1</p>
                    {editAble && polygon == "rectangle" && (
                      <Button
                        variant="solid"
                        color={
                          select == "rectangle_1_1" ? "success" : "secondary"
                        }
                        className="mt-2"
                        onClick={() =>
                          setSelect((prev) => {
                            if (prev == "rectangle_1_1") {
                              return "";
                            } else {
                              return "rectangle_1_1";
                            }
                          })
                        }
                      >
                        Pick
                      </Button>
                    )}
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex flex-row gap-2 border-b-1 border-text">
                      <div className="flex flex-col items-center">
                        <Input
                          dir="ltr"
                          value={rec.x2}
                          disabled={Boolean(
                            !editAble || polygon != "rectangle"
                          )}
                          onChange={(e) => {
                            setRec((prev) => {
                              return {
                                ...prev,
                                x2: Math.max(e.target.value,0),
                              };
                            });
                          }}
                        />
                        <p className="pt-2">X2</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <Input
                          dir="ltr"
                          value={rec.y2}
                          disabled={Boolean(
                            !editAble || polygon != "rectangle"
                          )}
                          onChange={(e) => {
                            setRec((prev) => {
                              return {
                                ...prev,
                                y2: Math.max(e.target.value,0),
                              };
                            });
                          }}
                        />
                        <p className="pt-2">Y2</p>
                      </div>
                    </div>
                    <p>Point 2</p>
                    {editAble && polygon == "rectangle" && (
                      <Button
                        variant="solid"
                        color={
                          select == "rectangle_2_2" ? "success" : "secondary"
                        }
                        className="mt-2"
                        onClick={() =>
                          setSelect((prev) => {
                            if (prev == "rectangle_2_2") {
                              return "";
                            } else {
                              return "rectangle_2_2";
                            }
                          })
                        }
                      >
                        Pick
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              {/* Line One */}
              <div className="pt-2">
                {editAble ? (
                  <p>{words["Edit Here for Line 1"][lang]}</p>
                ) : (
                  <p className="text-gray-500">
                    {words["Edit Here for Line 1"][lang]}
                  </p>
                )}
                <div
                  className="flex flex-row w-full justify-around gap-3"
                  dir="ltr"
                >
                  <div className="flex flex-col items-center">
                    <div className="flex flex-row gap-2 border-b-1 border-text">
                      <div className="flex flex-col items-center">
                        <Input
                          dir="ltr"
                          value={line1.x1}
                          disabled={Boolean(!editAble || polygon != "line1")}
                          onChange={(e) => {
                            setLine1((prev) => {
                              return {
                                ...prev,
                                x1: Math.max(e.target.value,0),
                              };
                            });
                          }}
                        />
                        <p className="pt-2">X1</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <Input
                          dir="ltr"
                          value={line1.y1}
                          disabled={Boolean(!editAble || polygon != "line1")}
                          onChange={(e) => {
                            setLine1((prev) => {
                              return {
                                ...prev,
                                y1: Math.max(e.target.value,0),
                              };
                            });
                          }}
                        />
                        <p className="pt-2">Y1</p>
                      </div>
                    </div>
                    <p>Point 1</p>
                    {editAble && polygon == "line1" && (
                      <Button
                        variant="solid"
                        color={select == "line_1_1" ? "success" : "secondary"}
                        className="mt-2"
                        onClick={() =>
                          setSelect((prev) => {
                            if (prev == "line_1_1") {
                              return "";
                            } else {
                              return "line_1_1";
                            }
                          })
                        }
                      >
                        Pick
                      </Button>
                    )}
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex flex-row gap-2 border-b-1 border-text">
                      <div className="flex flex-col items-center">
                        <Input
                          dir="ltr"
                          value={line1.x2}
                          disabled={Boolean(!editAble || polygon != "line1")}
                          onChange={(e) => {
                            setLine1((prev) => {
                              return {
                                ...prev,
                                x2: Math.max(e.target.value,0),
                              };
                            });
                          }}
                        />
                        <p className="pt-2">X2</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <Input
                          dir="ltr"
                          value={line1.y2}
                          disabled={Boolean(!editAble || polygon != "line1")}
                          onChange={(e) => {
                            setLine1((prev) => {
                              return {
                                ...prev,
                                y2: Math.max(e.target.value,0),
                              };
                            });
                          }}
                        />
                        <p className="pt-2">Y2</p>
                      </div>
                    </div>
                    <p>Point 2</p>
                    {editAble && polygon == "line1" && (
                      <Button
                        variant="solid"
                        color={select == "line_1_2" ? "success" : "secondary"}
                        className="mt-2"
                        onClick={() =>
                          setSelect((prev) => {
                            if (prev == "line_1_2") {
                              return "";
                            } else {
                              return "line_1_2";
                            }
                          })
                        }
                      >
                        Pick
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              {/* Line TWO */}
              <div className="pt-2">
                {editAble ? (
                  <p>{words["Edit Here for Line 2"][lang]}</p>
                ) : (
                  <p className="text-gray-500">
                    {words["Edit Here for Line 2"][lang]}
                  </p>
                )}
                <div
                  className="flex flex-row w-full justify-around gap-3"
                  dir="ltr"
                >
                  <div className="flex flex-col items-center">
                    <div className="flex flex-row gap-2 border-b-1 border-text">
                      <div className="flex flex-col items-center">
                        <Input
                          dir="ltr"
                          value={line2.x1}
                          disabled={Boolean(!editAble || polygon != "line2")}
                          onChange={(e) => {
                            setLine2((prev) => {
                              return {
                                ...prev,
                                x1: Math.max(e.target.value,0),
                              };
                            });
                          }}
                        />
                        <p className="pt-2">X1</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <Input
                          dir="ltr"
                          value={line2.y1}
                          disabled={Boolean(!editAble || polygon != "line2")}
                          onChange={(e) => {
                            setLine2((prev) => {
                              return {
                                ...prev,
                                y1: Math.max(e.target.value,0),
                              };
                            });
                          }}
                        />
                        <p className="pt-2">Y1</p>
                      </div>
                    </div>
                    <p>Point 1</p>
                    {editAble && polygon == "line2" && (
                      <Button
                        variant="solid"
                        color={select == "line_2_1" ? "success" : "secondary"}
                        className="mt-2"
                        onClick={() =>
                          setSelect((prev) => {
                            if (prev == "line_2_1") {
                              return "";
                            } else {
                              return "line_2_1";
                            }
                          })
                        }
                      >
                        Pick
                      </Button>
                    )}
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex flex-row gap-2 border-b-1 border-text">
                      <div className="flex flex-col items-center">
                        <Input
                          dir="ltr"
                          value={line2.x2}
                          disabled={Boolean(!editAble || polygon != "line2")}
                          onChange={(e) => {
                            setLine2((prev) => {
                              return {
                                ...prev,
                                x2: Math.max(e.target.value,0),
                              };
                            });
                          }}
                        />
                        <p className="pt-2">X2</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <Input
                          dir="ltr"
                          value={line2.y2}
                          disabled={Boolean(!editAble || polygon != "line2")}
                          onChange={(e) => {
                            setLine2((prev) => {
                              return {
                                ...prev,
                                y2: Math.max(e.target.value,0),
                              };
                            });
                          }}
                        />
                        <p className="pt-2">Y2</p>
                      </div>
                    </div>
                    <p>Point 2</p>
                    {editAble && polygon == "line2" && (
                      <Button
                        variant="solid"
                        color={select == "line_2_2" ? "success" : "secondary"}
                        className="mt-2"
                        onClick={() =>
                          setSelect((prev) => {
                            if (prev == "line_2_2") {
                              return "";
                            } else {
                              return "line_2_2";
                            }
                          })
                        }
                      >
                        Pick
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Edit Applying Button */}
            {editAble && (
              <div className="w-full flex flex-row justify-around py-2">
                <Button
                  onClick={() => {
                    setEditAble((prev) => !prev);
                    handleApply();
                  }}
                  variant="solid"
                  color="success"
                >
                  Apply
                </Button>
                <Button
                  onClick={() => {
                    setEditAble((prev) => !prev);
                    publishJsonData();
                  }}
                  variant="solid"
                  color="success"
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
          {/* Enable Editing */}
          <div className="w-full flex flex-row justify-center py-2">
            {!editAble && (
              <Button
                variant="solid"
                color="success"
                onClick={() => setEditAble((prev) => !prev)}
              >
                Edit
              </Button>
            )}
          </div>
        </div>
        {/* Live Streaming */}
        <div className="flex-1 flex flex-row justify-center items-center">
          <div
            ref={streamRef}
            onMouseDown={(e) => {
              handlePoint({
                x: e.nativeEvent.offsetX,
                y: e.nativeEvent.offsetY,
                e: e,
              });
            }}
            className={
              editAble ? "cursor-crosshair relative" : "cursor-normal relative"
            }
            style={{
              width: 900,
              height: 500,
            }}
          >
            {/* <img src={streamImage} /> */}
            <MQTTReceiver />
            {/* Line 1 Draw */}
            <div
              style={{
                top: line1.y1 * dimentaion.height,
                left: line1.x1 * dimentaion.width,
              }}
              className="w-1 h-1 rounded-full absolute z-40 bg-red-500 LINE_1_1"
            ></div>
            <div
              style={{
                top: line1.y2 * dimentaion.height,
                left: line1.x2 * dimentaion.width,
              }}
              className="w-1 h-1 rounded-full absolute z-40 bg-red-500 LINE_1_2"
            ></div>
            <LineTo
              delay
              from="LINE_1_1"
              to="LINE_1_2"
              borderColor="red"
              borderWidth={"3px"}
            />
            {/* -------------------------- */}
            {/* Line 2 Draw */}
            <div
              style={{
                top: line2.y1 * dimentaion.height,
                left: line2.x1 * dimentaion.width,
              }}
              className="w-1 h-1 rounded-full absolute z-40 bg-orange-500 LINE_2_1"
            ></div>
            <div
              style={{
                top: line2.y2 * dimentaion.height,
                left: line2.x2 * dimentaion.width,
              }}
              className="w-1 h-1 rounded-full absolute z-40 bg-orange-500 LINE_2_2"
            ></div>
            <LineTo
              delay
              from="LINE_2_1"
              to="LINE_2_2"
              borderColor="blue"
              borderWidth={"3px"}
            />
            {/* ------------------------- */}
            <div
              style={{
                top: updatedRec.y1 * dimentaion.height,
                left: updatedRec.x1 * dimentaion.width,
              }}
              className="w-1 h-1 rounded-full absolute z-40 bg-purple-500 REC_1_1"
            ></div>
            <div
              style={{
                top: updatedRec.y2 * dimentaion.height,
                left: updatedRec.x2 * dimentaion.width,
              }}
              className="w-1 h-1 rounded-full absolute z-40 bg-purple-500 REC_1_4"
            ></div>
            {
              <div
                style={{
                  top: updatedRec.y1 * dimentaion.height,
                  left: updatedRec.x2 * dimentaion.width,
                }}
                className="w-1 h-1 rounded-full absolute z-40 bg-purple-500 REC_1_2"
              ></div>
            }
            {
              <div
                style={{
                  top: updatedRec.y2 * dimentaion.height,
                  left: updatedRec.x1 * dimentaion.width,
                }}
                className="w-1 h-1 rounded-full absolute z-40 bg-purple-500 REC_1_3"
              ></div>
            }
            <LineTo
              borderWidth={"3px"}
              delay
              from="REC_1_1"
              to="REC_1_2"
              borderColor="purple"
            />
            <LineTo
              borderWidth={"3px"}
              delay
              from="REC_1_2"
              to="REC_1_4"
              borderColor="purple"
            />
            <LineTo
              borderWidth={"3px"}
              delay
              from="REC_1_4"
              to="REC_1_3"
              borderColor="purple"
            />
            <LineTo
              borderWidth={"3px"}
              delay
              from="REC_1_3"
              to="REC_1_1"
              borderColor="purple"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraSettings;
