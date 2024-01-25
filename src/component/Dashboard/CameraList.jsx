/* eslint-disable react/prop-types */
import { Card, CardBody, Spinner } from "@nextui-org/react";
import { useSelector } from "react-redux";
import cameraIcon from "../../assets/icons/cctv-camera.png";
import cameraIconAlt from "../../assets/icons/cctv-camera-alt.png";
import moment from "moment";

const CameraList = ({ data }) => {
  const mode = useSelector((state) => state.global.mode);
  const { words, lang } = useSelector((state) => state.language);
  const { statusTime } = useSelector((state) => state.global);
  const { allCamera } = useSelector((state) => state.camera);
  console.log(data);
  const cameraIDtoName = new Map();
  allCamera?.map((cam) => {
    cameraIDtoName.set(cam.id, cam.sn);
  });
  const revisedData = data?.map((cam) => {
    return {
      ...cam,
      sn: cameraIDtoName.get(cam.camera),
    }
  }).sort((a,b) => {
    if(a.sn < b.sn){
      return -1;
    }else if(a.sn == b.sn){
      return 0;
    }else{
      return 1;
    }
  });
  console.log(revisedData);
  return (
    <Card
      className={`text-text col-span-2 lg:col-span-2 shadow-small p-4 rounded-2xl cursor-pointer group bg-bgalt border-0 outline-0 hover:bg-bgalt hover:text-text hover:scale-105 ${mode}`}
    >
      <CardBody className="flex flex-row items-center gap-5 text-right">
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
        <table className="flex-grow">
          <tr className="text-right text-sm grid grid-cols-4 justify-items-center mb-2">
            <th className="font-normal">SN</th>
            <th className="font-normal">{words["in"][lang]}</th>
            <th className="font-normal">{words["out"][lang]}</th>
            <th className="font-normal">{words["status"][lang]}</th>
          </tr>
          {revisedData &&
            revisedData.map((item) => {
              // console.log(moment(item?.time).diff(Date.now(), 'minute'));
              const timeTable = moment(item?.time).diff(Date.now(), 'minute');
              console.log(timeTable);
              return (
                <tr
                  key={item.camera}
                  className="grid grid-cols-4 justify-items-center text-right"
                >
                  <td className="font-semibold">{item.sn}</td>
                  <td className="font-semibold">{item.totals_in}</td>
                  <td className="font-semibold">{item.totals_out}</td>
                  {/* <td className="font-semibold">{item.out}</td> */}
                  <td
                    dir="ltr"
                    className={`${
                      timeTable >= statusTime ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {timeTable >= statusTime ? 'Online' : 'Offline'}
                  </td>
                </tr>
              );
            })}
        </table>
      </CardBody>
    </Card>
  );
};

export default CameraList;
