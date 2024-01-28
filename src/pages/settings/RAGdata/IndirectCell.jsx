/* eslint-disable react/prop-types */
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
  } from "@nextui-org/react";
import { useState } from "react";

const IndirectCell = ({ index, user, handleSubmit, handleEditModalOpen }) => {

    
    const [showFullDescription, setShowFullDescription] = useState(false);

    const handleReadMoreClick = () => {
      setShowFullDescription(!showFullDescription);
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
<TableRow className="grid grid-cols-5" key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{user?.title}</TableCell>
            <TableCell>
                {showFullDescription ? (
                user?.description
                ) : (
                <>
                    {user?.description.slice(0, 10)}
                    {user?.description.length > 10 && '... '}
                    <button onClick={handleReadMoreClick}>
                    {showFullDescription ? 'Read Less' : 'Read More'}
                    </button>
                </>
                )}
            </TableCell>
            <TableCell className="w-full">
                <p className="w-full">{user?.review}</p>
            </TableCell>
            <TableCell>
                <Button color="danger" size="sm" radius="sm" onClick={() => handleSubmit(user?.id)}>
                Delete
                </Button>{" "}
                <Button
                color="warning"
                size="sm"
                radius="sm"
                onClick={() => handleEditModalOpen(modalData[2], user)}
                >
                Edit
                </Button>
            </TableCell>
            </TableRow>
    );
};

export default IndirectCell;