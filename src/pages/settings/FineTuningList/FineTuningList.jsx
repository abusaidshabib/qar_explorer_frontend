import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Pagination
  } from "@nextui-org/react";

import { useDispatch, useSelector } from "react-redux";
import { useDeleteUserMutation } from "../../../redux/apis/userApi";
import { useEffect, useState } from "react";
import ImportantModal from "../ImportantModal";
import { useDeleteFineTuneMutation, useGetFineTuneQuery } from "../../../redux/apis/FineTuningApi";
import { setSelectedFineTuneData } from "../../../redux/slices/fineTuning";
import { RiEditLine } from "react-icons/ri";
import { MdOutlineDelete } from "react-icons/md";

const FineTuningList = () => {
  const [page, setPage] = useState(1);
  const { data: fineData, isLoading: isFineLoading, refetch } = useGetFineTuneQuery(page, {
    pollingInterval: 60000,
  });

  const [valueFine, setValueFine] = useState(undefined);
  useEffect(()=>{
    if(fineData?.results){
      setValueFine(fineData?.results.slice().map((data) => {
        return {
          ...data,
          toggle: false
        }
      }))
    }
  },[fineData?.results])

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

    const handleInputChange2 = (value) => {
      
      setValueFine((prev)=> {
        const subarray = prev.map((data) => {
          if(value.id==data.id){
            return {
              ...data,
              toggle: true
            }
            
          }
          else{
            return {
              ...data,
              toggle: false
            }
          }
        })
        return subarray
      })
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
       (!isFineLoading&& <div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 place-items-center gap-5 p-5">
            <Button className="w-56" color="warning" onClick={handleDownloadCSV}>Download All Data</Button>
            <Button className="w-56" color="primary" variant="ghost" onClick={() => handleEditModalOpen(modalData[0])}>Upload CSV</Button> 
            <Button className="w-56" color="primary" variant="solid" onClick={handleDownload}>CSV Template Download</Button>
            <Button className="w-56" color="secondary" variant="ghost" onClick={() => handleEditModalOpen(modalData[1])}>Add New Data</Button>
          </div>
        <Table
        isHeaderSticky
          removeWrapper
          aria-label="Tent list"
          dir="ltr"
          className="text-right"
          bottomContent={
            page > 0 ? (
              <div className="flex w-full justify-center">
               <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={fineData.count/10}
            onChange={setPage}
          />
              </div>
            ) : null
          }
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
          {(valueFine?.length > 0) && valueFine?.map((user, index) => (
            <TableRow className={`${user?.toggle && "bg-zinc-200 rounded-xl"}`} key={index} onClick={()=>handleInputChange2(user)} >
              <TableCell className="text-balance pl-5">{user?.id}</TableCell>
              {/* <TableCell className="text-balance  w-1/4 px-5">{user?.toggle? user?.question:user?.question.slice(0,20)}</TableCell> */}
              <TableCell className="text-balance  w-1/4 px-5">{user?.question}</TableCell>
              <TableCell className="text-balance  w-1/4 pr-5">{user?.answer}</TableCell>
              {/* <TableCell className="text-balance  w-1/4 pr-5">{user?.toggle? user?.answer:user?.answer.slice(0,20)}</TableCell> */}
              <TableCell className="pr-5">
                <p className="text-balance">{user?.review ? user?.review:"No Review here"}</p>
              </TableCell>
              <TableCell className="flex gap-5 justify-end items-center">
                <Button color="danger" size="sm" radius="sm" onClick={() => handleSubmit(user?.id)}>
                <MdOutlineDelete className="text-lg" />
                  Delete
                </Button>
                  {" "}
                  <Button color="warning" size="sm" radius="sm"
                  onClick={() => handleEditModalOpen(modalData[2], user)}
                  >
                    <RiEditLine className="text-lg" />
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
      </div>)
      
    );
};

export default FineTuningList;