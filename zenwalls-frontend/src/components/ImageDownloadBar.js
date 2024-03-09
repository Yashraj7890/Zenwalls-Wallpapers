import React from 'react';
import ModalTrigger from './ModalTrigger';
import swal from 'sweetalert';
import axios from "axios";
const ImageWithDownloadBar = ({ children, imageData,fav,update }) => {
    
   const setFavourite=async(req,res)=>{
    try{
        const response=await axios.post("https://zenwalls-wallpapers.onrender.com/setFavourite",{image:imageData},{ withCredentials: true });
        if(response.data==1){
            swal("Added to favourites", "Go to my profile to view favourites", "success");
        }else{
            swal("Already in favourites", "Go to my profile to view favourites", "warning");
        }
    }
    catch(err){
    console.log(err);
    }
   }
   const removeFavourite=async(req,res)=>{
    update(imageData.id);
    try{
        const response=await axios.post("https://zenwalls-wallpapers.onrender.com/removeFavourite",{image:imageData},{ withCredentials: true });
        
        if(response.data.success){
            swal("Removed from favourites", "", "success");
        }else{
            swal("Error removing from favourites", "", "error");
        }
    }
    catch(err){
    console.log(err);
    }
   }

    return (
        <div style={{ position: 'relative', display: 'inline-block', overflow: 'hidden' }}>
            {children}
            <div
            style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '40px',
                    background: 'rgba(0, 0, 0, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 16px',
                    boxSizing: 'border-box',
                }}>
                {fav?(<div style={{ color: '#fff' }}>
                    <button style={{
                        color: '#fff',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '16px',
                        padding: '8px',
                        borderRadius: '4px',
                        outline: 'none',
                    }} onClick={setFavourite}>
                <i className="fa-solid fa-heart" style={{ color: "white", size: "2rem" }}></i></button>
                </div>):(
                    <div style={{ color: '#fff' }}>
                    <button style={{
                        color: '#fff',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '16px',
                        padding: '8px',
                        borderRadius: '4px',
                        outline: 'none',
                    }} onClick={removeFavourite}>
                <i className="fa-solid fa-trash" style={{ color: "white", size: "2rem" }}></i></button>
                </div>
                )}
                <ModalTrigger modalData={imageData}></ModalTrigger>
            </div>
        </div>
    );
};

export default ImageWithDownloadBar;
