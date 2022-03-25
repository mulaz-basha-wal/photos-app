import React, { useContext, useState } from "react";
import "./styles/Photos.css";
import Photo from "./Photo";
import PhotosContext from "./PhotosContext";
import { Modal, ModalHeader, ModalBody, Container } from "reactstrap";

export default function Photos() {
  const { state } = useContext(PhotosContext);
  const [modalState, setModalState] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalImage, setModalImage] = useState("");

  const toggle = () => {
    setModalState(!modalState);
  };
  const onClickImage = (imageData) => {
    setModalTitle(`${imageData.id} - ${imageData.title}`);
    setModalImage(imageData.url);
    toggle();
  };

  return (
    <div>
      <Container className='photos-container'>
        {state.photos.map((photo) => {
          return (
            <Photo
              key={photo.id}
              photoData={photo}
              imageClickHandler={onClickImage}
            />
          );
        })}
      </Container>
      <Modal isOpen={modalState} toggle={toggle} className='clearfix' size='lg'>
        <ModalHeader toggle={toggle} charcode='X'>
          {modalTitle}
        </ModalHeader>
        <ModalBody className='clearfix'>
          <img className='modal-img' src={modalImage} alt={modalTitle} />
        </ModalBody>
      </Modal>
    </div>
  );
}
