import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
  } from "@nextui-org/react";

import { useDispatch, useSelector } from "react-redux";
import { useDeleteUserMutation } from "../../../redux/apis/userApi";
import { useState } from "react";
import ImportantModal from "../ImportantModal";
import { useDeleteFineTuneMutation, useGetFineTuneQuery } from "../../../redux/apis/FineTuningApi";
import { setSelectedFineTuneData } from "../../../redux/slices/fineTuning";

const FineTuningList = () => {
  const { data: fineData, isLoading: isFineLoading, refetch } = useGetFineTuneQuery(undefined, {
    pollingInterval: 60000,
  });
    const { words, lang } = useSelector((state) => state.language);
    const [deleteFineTune, {data,isLoading, error, isError}] = useDeleteFineTuneMutation();
    const handleSubmit = (email) => {
      deleteFineTune(email);
    }

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [modelValue, setModelValue] = useState(null);
    const dispatch = useDispatch();


    const handleEditModalOpen = (modal, value) => {
      setSelectedUser(modal);
      setIsEditModalOpen(true);
      setModelValue(modal)
      dispatch(setSelectedFineTuneData(value))
    };

    const handleEditModalClose = () => {
      setSelectedUser(null);
      setIsEditModalOpen(false);
    };

    const handleDownload = () => {
      const filename = 'fine_tuning_csv_format.csv';
      const downloadUrl = "http://localhost:5173/" + filename;
      console.log(import.meta.VITE_APP_HOST)
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      link.click();
    };

    const handleDownloadCSV = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v4/download-finedata-csv/');
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'finedata.csv';
        link.click();
      } catch (error) {
        console.error('Error downloading CSV:', error);
      }
    };

    let modalData = [
      {
          "method": "POST",
          "heading": "Upload CSV file",
          "url": "http://localhost:8000/api/v4/upload-finecsv/",
          "type": "FineCSV"
      },
      {
          "method":"POST",
          "heading":"Add New Data",
          "url":"http://localhost:8000/api/v4/fine-tuning-qas/",
          "type": "FineNewData"
      },
      {
          "method":"PATCH",
          "heading":"Edit Data",
          "url":"http://localhost:8000/api/v4/fine-tuning-qas/",
          "type":"FineUpdateData"
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
            {(fineData?.length > 0) && fineData?.map((value,index) => (
              <TableRow key={index}>
                <TableCell>{index}</TableCell>
                <TableCell>{value.question}</TableCell>
                <TableCell>{value.answer}</TableCell>
                <TableCell>{value.review}</TableCell>
                <TableCell>
                  <Button color="danger" size="sm" radius="sm" onClick={() => handleSubmit(value.id)}>
                    Delete
                  </Button>
                  {" "}
                  <Button color="warning" size="sm" radius="sm"
                  onClick={() => handleEditModalOpen(modalData[2], value)}
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
          refetch={refetch}
        />
      )}
      </div>
    );
};

export default FineTuningList;