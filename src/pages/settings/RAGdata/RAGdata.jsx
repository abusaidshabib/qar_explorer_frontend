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
import { useEffect, useState } from "react";
import ImportantModal from "../ImportantModal";
// import { useGetRagDataQuery } from "../../../redux/apis/ragDataApi";
import { useDeleteRagDataMutation, useGetRagDataQuery } from "../../../redux/apis/ragDataApi";
import { setSelectedRagData } from "../../../redux/slices/RagData";
import { RiEditLine } from "react-icons/ri";
import { MdOutlineDelete } from "react-icons/md";

const RAGdata = () => {
  const [page, setPage] = useState(1);
    const { words, lang } = useSelector((state) => state.language);
    const { data: ragAllData, isLoading: isFineLoading, refetch  } = useGetRagDataQuery(undefined, {
      pollingInterval: 60000,
    });
    const [valueRag, setValueRag] = useState(undefined);

    useEffect(()=>{
      if(ragAllData?.results){
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setValueRag(ragAllData?.results?.slice().map((data)=> {
          return {
            ...data,
            toggle: false
          }
        }))
      }
    }, [ragAllData?.results])

    const [deleteRagData, {data,isLoading, error, isError}] = useDeleteRagDataMutation();
    const handleSubmit = (email) => {
      deleteRagData(email);
      console.log(email)
    }

    const dispatch = useDispatch();

    // const [ragValue, setragValue] = useState(undefined);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [modelValue, setModelValue] = useState(null);
    const handleEditModalOpen = (user, value) => {
      setSelectedUser(user);
      setIsEditModalOpen(true);
      setModelValue(user)
      dispatch(setSelectedRagData(value))
    };
    const handleEditModalClose = () => {
      setSelectedUser(null);
      setIsEditModalOpen(false);
    };
    

    const handleInputChange1 = (value) => {
      
      setValueRag((prev)=> {
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


  
    // const loadingState = isLoading || valueRag?.results.length === 0 ? "loading" : "idle";

    // const pages = 

    let pages = Math.ceil(valueRag?.length / 10);

    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 place-items-center gap-5 p-5">
            <Button className="w-56" color="warning" onClick={handleDownloadCSV}>Download All Data</Button>
            <Button className="w-56" color="primary" variant="ghost" onClick={() => handleEditModalOpen(modalData[0])}>Upload CSV</Button> 
            <Button className="w-56" color="primary" variant="solid" onClick={handleDownload}>CSV Template Download</Button>
            <Button className="w-56" color="secondary" variant="ghost" onClick={() => handleEditModalOpen(modalData[1])}>Add New Data</Button>
        </div>
      <Table
        removeWrapper
        aria-label="Tent list"
        dir="ltr"
        className="text-right max-w-[calc(100vw-400px)]"
        bottomContent={
          page > 0 ? (
            <div className="flex w-full justify-center">
             <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
            </div>
          ) : null
        }
      >
        <TableHeader className="">
          <TableColumn className="text-right">{words["serial"][lang]}</TableColumn>
          <TableColumn className="text-right">
            {words["title"][lang]}
          </TableColumn>
          <TableColumn className="text-right">
            {words["description"][lang]}
          </TableColumn>
          <TableColumn className="text-right">
            {words["review"][lang]}
          </TableColumn>
          <TableColumn className="text-right">Action</TableColumn>
        </TableHeader>
        <TableBody>
          {(valueRag?.length > 0) && valueRag?.map((user, index) => (
            <TableRow className={`${user?.toggle && "bg-zinc-200 rounded-xl"}`} key={index} onClick={()=>handleInputChange1(user)} >
              <TableCell className="text-balance pl-5">{index + 1}</TableCell>
              {/* <TableCell className="text-balance w-1/4 px-5">{user?.toggle? user?.title:user?.title.slice(0,20)}</TableCell> */}
              {/* <TableCell className="text-balance w-1/4 pr-5">{user?.toggle? user?.description:user?.description.slice(0,20)}</TableCell> */}
              <TableCell className="text-balance w-1/4 px-5">{user?.title}</TableCell>
              <TableCell className="text-balance w-1/4 pr-5">{user?.description}</TableCell>
              <TableCell className="pr-5">
                <p className="text-balance">{user?.review}</p>
              </TableCell>
              <TableCell className="flex gap-5 justify-end">
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
    </div>
    );
};

export default RAGdata;