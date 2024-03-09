
import React, { useState } from 'react';
import Modal from './InnerModal';
import '../index.css'; 

const ModalTrigger = (modalData) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button className="download-button" onClick={handleModalToggle}>
      <i className="fa-solid fa-download"></i>
      </button>
      {isModalOpen && <Modal onClose={handleCloseModal} data={modalData} />}
    </div>
  );
};

export default ModalTrigger;
