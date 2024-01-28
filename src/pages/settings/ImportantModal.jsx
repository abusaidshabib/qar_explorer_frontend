/* eslint-disable react/prop-types */
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ImportantModal = ({ isOpen, onClose, modelValue, refetch }) => {
  const {user} = useSelector((state) => state.auth);
  const {selectedFineTuneData} = useSelector((state) => state.finetuning)
  const { selectedRagData } = useSelector((state) => state.ragdata)



    const createdByEmail = user?.email;
    const [ragValue, setragValue] = useState({
      title: '',
      description: '',
      review: 'Accept',
      created_by_email: createdByEmail
    });

    useEffect(()=> {
      if(selectedRagData){
        setragValue(selectedRagData)
      }
    },[selectedRagData])
    

    const [fineValue, setFineValue] = useState({
        question: '',
        answer: '',
        review: 'Accept',
        created_by_email: createdByEmail
      });

      

      useEffect(()=> {
        if(selectedFineTuneData){
          setFineValue(selectedFineTuneData)
        }
      },[selectedFineTuneData])

    const handleInputChange1 = (type, value) => {
      console.log(type, value)
      if (value !== undefined) {
        setragValue((prevValue) => ({
          ...prevValue,
          [type]: value,
        }));
      }
    };
    const handleInputChange2 = (type, value) => {
      if (value !== undefined) {
        setFineValue((prevValue) => ({
          ...prevValue,
          [type]: value,
        }));
      }
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

            case "RagUpdateData":
                  headersValue = {
                      'Content-Type': 'application/json',
                    }
                  formData = JSON.stringify(ragValue)
                  modelValue.url = modelValue?.url + ragValue?.id + "/"
                  break;
                
            case "FineNewData":
                headersValue = {
                    'Content-Type': 'application/json',
                  }
                formData = JSON.stringify(fineValue)
                break;

            case "FineUpdateData":
                headersValue = {
                    'Content-Type': 'application/json',
                  }
                formData = JSON.stringify(fineValue)
                modelValue.url = modelValue?.url + fineValue?.id + "/"
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
            refetch()
          } else {
            console.error('Failed to upload');
          }
        } catch (error) {
          console.error('Error uploading:', error);
        }
      };

      const reviewOptions = ["Accept", "Reject"]

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>{modelValue?.heading}</ModalHeader>
          <ModalBody>
          <div className="grid gap-4">
          <>
      {(modelValue?.type === "RagNewData" || modelValue?.type === "RagUpdateData") && (
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
          <Select 
        label="Review" 
        defaultSelectedKeys={["Accept"]}
        onChange={(e) => handleInputChange1('review', e.target.value)}
      >
        {reviewOptions.map((animal) => (
          <SelectItem key={animal} value={animal}>
            {animal}
          </SelectItem>
        ))}
      </Select>
        </>
      )}
      {(modelValue?.type === "FineNewData" || modelValue?.type === "FineUpdateData") && (
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
      <Select 
        label="Review" 
        defaultSelectedKeys={["Accept"]}
        onChange={(e) => handleInputChange2('review', e.target.value)}
      >
        {reviewOptions.map((animal) => (
          <SelectItem key={animal} value={animal}>
            {animal}
          </SelectItem>
        ))}
      </Select>
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