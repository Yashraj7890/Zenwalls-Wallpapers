
import React, { useRef, useEffect } from 'react';
import '../index.css';

const Modal = ({ onClose, data }) => {
  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  const handleDisplayButtonClick = (type) => {
    let url;
    if(type===1){
    url=data.modalData.src.original;
    }
    else if(type===2){
    url=data.modalData.src.medium;   
    }
    else if(type===3){
    url=data.modalData.src.portrait; 
    }
    else if(type===4){
    url=data.modalData.src.landscape;  
    }
      const link = document.createElement('a');
      link.href = url;
      link.target="_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  const handleDownload = (type) => {
    let url;
        if(type===1){
        url=data.modalData.src.original;
        }
        else if(type===2){
        url=data.modalData.src.medium;   
        }
        else if(type===3){
        url=data.modalData.src.portrait; 
        }
        else if(type===4){
        url=data.modalData.src.landscape;  
        }

      fetch(url)
      .then(response => response.blob())
      .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'downloaded-image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="modal" ref={modalRef}>
      <div
            style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'rgba(0, 0, 0, 0.6)',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                zIndex: 1000,
                height: "500px",
                width: "300px"
            }}
            ref={modalRef}
        >
        <div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}>
        <div style={{ textAlign: "right", paddingTop: "0.6rem", width: "100%" }}>
        <button style={{
        color: '#fff',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        padding: '4px',
        outline: 'none',
        fontSize: '1.6rem',
        marginRight: "1rem"
        }} onClick={onClose}><i className="fa-solid fa-xmark"></i></button>
        </div>
        <div style={{ color: 'white', textAlign: "center", fontSize: "1.2rem", fontWeight: "lighter" }}>Preview & Download</div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "5rem" }}>
        <div style={{ width: "100%", textAlign: "center" }}><button onClick={() => handleDisplayButtonClick(1)} className='btn btn-outline-light' style={{width:"8rem"}}>Original <i className="fa-solid fa-image"></i></button>
        <button className='btn btn-outline-light' style={{marginLeft:"1rem"}} onClick={()=>handleDownload(1)}><i className="fa-solid fa-circle-down"></i></button></div>
        <div style={{ width: "100%", textAlign: "center", marginTop: "1.3rem" }}><button onClick={() => handleDisplayButtonClick(2)}  className='btn btn-outline-light' style={{width:"8rem"}}>Smaller <i className="fa-solid fa-image"></i></button>
        <button className='btn btn-outline-light' style={{marginLeft:"1rem"}} onClick={()=>handleDownload(2)}><i className="fa-solid fa-circle-down"></i></button></div>
        <div style={{ width: "100%", textAlign: "center", marginTop: "1.3rem" }}><button onClick={() => handleDisplayButtonClick(3)} className='btn btn-outline-light' style={{width:"8rem"}}>Portrait <i className="fa-solid fa-image"></i></button>
        <button className='btn btn-outline-light' style={{marginLeft:"1rem"}} onClick={()=>handleDownload(3)}><i className="fa-solid fa-circle-down"></i></button></div>
        <div style={{ width: "100%", textAlign: "center", marginTop: "1.3rem" }}><button onClick={() => handleDisplayButtonClick(4)} className='btn btn-outline-light' style={{width:"8rem"}}>Landscape <i className="fa-solid fa-image"></i></button>
        <button className='btn btn-outline-light' style={{marginLeft:"1rem"}} onClick={()=>handleDownload(4)}><i className="fa-solid fa-circle-down"></i></button></div>
        </div>
        </div>
        </div>
        </div>
    </div>
  );
};

export default Modal;
