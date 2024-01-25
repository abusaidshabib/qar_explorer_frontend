import { useSelector } from "react-redux";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useDeleteTentMutation } from "../../../redux/apis/tentApi";

const TentList = () => {
  const { tentList } = useSelector((state) => state.tent);
  const { words, lang } = useSelector((state) => state.language);
  const [deleteTent, {data,error}] = useDeleteTentMutation();
  console.log(tentList);
  const handleSubmit = (id) => {
    deleteTent(id);
  }
  return (
    <div>
      <Table
        removeWrapper
        aria-label="Tent list"
        dir="ltr"
        className="text-right"
      >
        <TableHeader>
          <TableColumn className="text-right">Actions</TableColumn>
          <TableColumn className="text-right">
            {words["Location"][lang]}
          </TableColumn>
          <TableColumn className="text-right">
            {words["long"][lang]}
          </TableColumn>
          <TableColumn className="text-right">{words["lat"][lang]}</TableColumn>
          <TableColumn className="text-right">
            {words["name"][lang]}
          </TableColumn>
          <TableColumn className="text-right">{words["id"][lang]}</TableColumn>
        </TableHeader>
        <TableBody>
          {(tentList?.length > 0) && tentList?.map((tent) => (
            <TableRow key={tent.id}>
              <TableCell>
                <Button color="danger" size="sm" radius="sm"  onClick={() => handleSubmit(tent.id)}>
                  Delete
                </Button>
              </TableCell>
              <TableCell>{tent.location}</TableCell>
              <TableCell>{tent.long}</TableCell>
              <TableCell>{tent.lat}</TableCell>
              <TableCell>{tent.name}</TableCell>
              <TableCell>{tent.id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TentList;
