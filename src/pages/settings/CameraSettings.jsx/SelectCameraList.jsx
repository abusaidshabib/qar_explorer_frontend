import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { SelectorIcon } from "../../../component/Dashboard/SelectorIcon";
import { setSelectedCameras } from "../../../redux/slices/camer";
import moment from "moment";


const SelectCameraList = () => {
  const mode = useSelector((state) => state.global.mode);
  const dispatch = useDispatch();
  const { lang, words } = useSelector((state) => state.language);
  const { statusTime } = useSelector((state) => state.global);
  const { allCamera, selectedCameras } = useSelector((state) => state.camera);
  return (
    <Select
      dir="ltr"
      radius="full"
      placeholder={words["Select a camera"][lang]}
      labelPlacement="outside"
      className={`${mode} max-w-xs`}
      aria-label="selectCamera"
      disableSelectorIconRotation
      defaultSelectedKeys={[selectedCameras?.id?.toString()]}
      onChange={(e) => dispatch(setSelectedCameras(e.target.value))}
      classNames={{
        popoverContent: `${mode} text-text bg-background`,
        trigger: `${mode} text-text bg-background group-hover:bg-bgalt/60`,
        mainWrapper: "group",
        value: "group-data-[has-value=true]:text-text",
      }}
      selectorIcon={<SelectorIcon />}
    >
      {(allCamera?.length > 0) &&
        allCamera?.map((camera, index) => {
          const cameraTime = moment(camera?.time).diff(Date.now(), "minute");
          return (
            <SelectItem
              className={`${mode} bg-background text-text`}
              key={camera?.id}
              value={camera?.id}
              dir={"ltr"}
            >
              {`${camera?.sn} - ${
                cameraTime >= statusTime ? "Online" : "Offline"
              }`}
            </SelectItem>
          );
        })}
    </Select>
  );
};

export default SelectCameraList;
