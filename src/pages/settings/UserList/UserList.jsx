import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { useDeleteUserMutation } from "../../../redux/apis/userApi";

const UserList = () => {
  const { userAll } = useSelector((state) => state.user);
  const { words, lang } = useSelector((state) => state.language);
  const [deleteUser, {data,isLoading, error, isError}] = useDeleteUserMutation();
  console.log(userAll)
  const handleSubmit = (email) => {
    deleteUser(email);
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
            {words["email"][lang]}
          </TableColumn>
          <TableColumn className="text-right">
            {words["name"][lang]}
          </TableColumn>
          <TableColumn className="text-right">{words["id"][lang]}</TableColumn>
        </TableHeader>
        <TableBody>
          {(userAll?.results?.length > 0) && userAll?.results?.map((user) => (
            <TableRow key={user.email}>
              <TableCell>
                <Button color="danger" size="sm" radius="sm" onClick={() => handleSubmit(user.email)}>
                  Delete
                </Button>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserList;
