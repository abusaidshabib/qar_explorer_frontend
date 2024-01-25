import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Button,
} from "@nextui-org/react";
import moment from "moment";
import { useSelector } from "react-redux";
import { useDeleteCameraMutation } from "../../../redux/apis/cameraApi";

const CameraList = () => {
  const { allCamera } = useSelector((state) => state.camera);
  const { statusTime } = useSelector((state) => state.global);
  const { tentList } = useSelector((state) => state.tent);
  const { words, lang } = useSelector((state) => state.language);
  const [deleteCamera, { data, error }] = useDeleteCameraMutation();
  const ara = new Map();
  tentList?.map((data) => {
    ara.set(data.id, data.name);
  });
  console.log(allCamera);
  const handleSubmit = (id) => {
    deleteCamera(id);
  };
  return (
    <div>
      <Table
        removeWrapper
        aria-label="Camera list"
        dir="ltr"
        className="text-right"
      >
        <TableHeader>
          <TableColumn className="text-right">Actions</TableColumn>
          <TableColumn className="text-right">
            {words["status"][lang]}
          </TableColumn>
          <TableColumn className="text-right">
            {words["tent"][lang]}
          </TableColumn>
          <TableColumn className="text-right">
            {words["Serial No."][lang]}
          </TableColumn>
        </TableHeader>
        <TableBody>
          {allCamera?.length > 0 &&
            allCamera?.map((camera) => {
              const cameraTime = moment(camera.time).diff(
                Date.now(),
                "minutes"
              );
              return (
                <TableRow key={camera.id}>
                  <TableCell>
                    <Button
                      color="danger"
                      size="sm"
                      radius="sm"
                      onClick={() => handleSubmit(camera.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                  <TableCell
                    className={`${
                      camera.status ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {cameraTime >= statusTime ? "Online" : "Offline"}
                  </TableCell>
                  <TableCell>{ara.get(camera.tent)}</TableCell>
                  <TableCell>{camera.sn}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default CameraList;
