/* eslint-disable react/prop-types */


const TableCellData = ({ index, user, handleSubmit, handleEditModalOpen }) => {

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
<>
</>
    );
};

export default TableCellData;