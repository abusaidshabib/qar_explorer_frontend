/* eslint-disable react/prop-types */
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { useState } from "react";

const ImportantModal = ({ isOpen, onClose, modelValue }) => {
    const createdByEmail = "admin@gmail.com";
    const [ragValue, setragValue] = useState({
        title: '',
        description: '',
        review: '',
        created_by_email: createdByEmail
      });
    const [fineValue, setFineValue] = useState({
        question: '',
        answer: '',
        review: '',
        created_by_email: createdByEmail
      });

    const handleInputChange1 = (type, value) => {
        setragValue((prevValue) => ({
          ...prevValue,
          [type]: value,
        }));
    };
    const handleInputChange2 = (type, value) => {
        setFineValue((prevValue) => ({
          ...prevValue,
          [type]: value,
        }));
    };

    let formData;
    let headersValue;
    const [file, setFile] = useState(null);
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
      };
    
      const handleUpload = async () => {
        
        // eslint-disable-next-line react/prop-types
        switch(modelValue?.type){
            case "RagCSV":
            case "FineCSV":
                formData = new FormData()
                headersValue = {}
                if (!file || !createdByEmail) {
                  console.error('Please select a file and provide created_by_email');
                  return;
                }
                formData.append('csv', file);
                formData.append('created_by_email', createdByEmail);
                // console.log(formData?.created_by_email)
                console.log(createdByEmail)
                break;

            case "RagNewData":
                headersValue = {
                    'Content-Type': 'application/json',
                  }
                formData = JSON.stringify(ragValue)
                break;
                
            case "FineNewData":
                headersValue = {
                    'Content-Type': 'application/json',
                  }
                formData = JSON.stringify(fineValue)
                break;

        }
      
        try {
          const response = await fetch(modelValue?.url, {
            // eslint-disable-next-line react/prop-types
            method: modelValue?.method,
            body: formData,
            headers: headersValue
          });
      
          if (response.ok) {
            console.log('successfully');
          } else {
            console.error('Failed to upload');
          }
        } catch (error) {
          console.error('Error uploading:', error);
        }
      };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>{modelValue?.heading}</ModalHeader>
          <ModalBody>
          <div className="grid gap-4">
          <>
      {modelValue?.type === "RagNewData" && (
        <>
          <Input
            type="title"
            label="Title"
            value={ragValue.title}
            onChange={(e) => handleInputChange1('title', e.target.value)}
          />
          <Input
            type="description"
            label="Description"
            value={ragValue.description}
            onChange={(e) => handleInputChange1('description', e.target.value)}
          />
          <Input
            type="review"
            label="Review"
            value={ragValue.review}
            onChange={(e) => handleInputChange1('review', e.target.value)}
          />
        </>
      )}
      {modelValue?.type === "FineNewData" && (
        <>
          <Input
            type="question"
            label="Question"
            value={fineValue.question}
            onChange={(e) => handleInputChange2('question', e.target.value)}
          />
          <Input
            type="answer"
            label="Answer"
            value={fineValue.answer}
            onChange={(e) => handleInputChange2('answer', e.target.value)}
          />
          <Input
            type="review"
            label="Review"
            value={fineValue.review}
            onChange={(e) => handleInputChange2('review', e.target.value)}
          />
        </>
      )}
    </>
<>
{
    (modelValue?.type === "RagCSV" || modelValue?.type === "FineCSV") && 
    <input type="file" onChange={handleFileChange} />
}
</>
          </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" variant="solid" onClick={() => { onClose(); handleUpload(); }}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
};

export default ImportantModal;