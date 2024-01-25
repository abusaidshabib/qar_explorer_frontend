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
import { useState } from "react";
import ImportantModal from "../ImportantModal";

const RAGdata = () => {

    const { userAll, finetuning } = useSelector((state) => state.user);
    const { words, lang } = useSelector((state) => state.language);
    const [deleteUser, {data,isLoading, error, isError}] = useDeleteUserMutation();
    const handleSubmit = (email) => {
      deleteUser(email);
    }

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [modelValue, setModelValue] = useState(null);
    const handleEditModalOpen = (user) => {
      setSelectedUser(user);
      setIsEditModalOpen(true);
      setModelValue(user)
    };

    const handleEditModalClose = () => {
      setSelectedUser(null);
      setIsEditModalOpen(false);
    };

    const handleDownload = () => {
      const filename = 'rag_csv_format.csv';
      const downloadUrl = "http://localhost:5173/" + filename;
      console.log(import.meta.VITE_APP_HOST)
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      link.click();
    };

    const handleDownloadCSV = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/v4/download-ragdata-csv/');
          const blob = await response.blob();
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = 'ragdata.csv';
          link.click();
        } catch (error) {
          console.error('Error downloading CSV:', error);
        }
    };

    let modalData = [
        {
            "method": "POST",
            "heading": "Upload CSV file",
            "url": "http://localhost:8000/api/v4/upload-ragcsv/",
            "type": "RagCSV"
        },
        {
            "method":"POST",
            "heading":"Add New Data",
            "url":"http://localhost:8000/api/v4/rag-data/",
            "type": "RagNewData"
        },
        {
            "method":"PATCH",
            "heading":"Edit Data",
            "url":"http://localhost:8000/api/v4/rag-data/",
            "type":"RagUpdateData"
        }
    ]

    return (
        <div>
        <div className="grid grid-cols-1 sm:grid-cols-3 place-content-center gap-5 p-5">
            <Button color="warning" onClick={handleDownloadCSV}>Download All Data</Button>
            <Button color="primary" variant="ghost" onClick={() => handleEditModalOpen(modalData[0])}>Upload CSV</Button> 
            <Button color="primary" variant="solid" onClick={handleDownload}>CSV Template Download</Button>
            <Button color="secondary" variant="ghost" onClick={() => handleEditModalOpen(modalData[1])}>Add New Data</Button>
        </div>
      <Table
        removeWrapper
        aria-label="Tent list"
        dir="ltr"
        className="text-right"
      >
        <TableHeader>
          <TableColumn className="text-right">{words["serial"][lang]}</TableColumn>
          <TableColumn className="text-right">
            {words["question"][lang]}
          </TableColumn>
          <TableColumn className="text-right">
            {words["answer"][lang]}
          </TableColumn>
          <TableColumn className="text-right">
            {words["review"][lang]}
          </TableColumn>
          <TableColumn className="text-right">Action</TableColumn>
        </TableHeader>
        <TableBody>
          {(userAll?.length > 0) && userAll?.map((user) => (
            <TableRow key={user.email}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>
                <Button color="danger" size="sm" radius="sm" onClick={() => handleSubmit(user.email)}>
                  Delete
                </Button>
                {" "}
                <Button color="warning" size="sm" radius="sm"
                onClick={() => handleEditModalOpen(modalData[2])}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isEditModalOpen && (
      <ImportantModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        user={selectedUser}
        modelValue={modelValue}
      />
    )}
    </div>
    );
};

export default RAGdata;