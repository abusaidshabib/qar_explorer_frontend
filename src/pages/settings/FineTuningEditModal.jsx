import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";

const FineTuningEditModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Edit User</ModalHeader>
        <ModalBody>
        <div className="grid gap-4">
      <Input type="question" label="Question" />
      <Input type="answer" label="Answer" />
      <Input type="review" label="Review" />
        </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" variant="solid" onPress={onClose}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FineTuningEditModal;
