import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Avatar from "@mui/material/Avatar";
import ImageWithDownloadBar from "./ImageDownloadBar";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import '../index.css';

const Profile = () => {
  const [status, setLoggedIn] = useState(true);
  const [userEmail, setEmail] = useState();
  const [userImage, setImage] = useState();
  const [imagesArray, setArray] = useState([]);
  const [count,setCount]=useState("Your Favourites");
  const navigate = useNavigate();
  
  const deleteElement = (imageId) => {
    const newArray = imagesArray.filter(obj => obj.id !== imageId);
    setArray([...newArray]);
  }


  useEffect(() => {
    const validate = async () => {
      try {
        const response = await axios.get("https://zenwalls-wallpapers.onrender.com/validate", {
          withCredentials: true,
        });
        if (response) {
          if(response.data.loggedIn===false){
            navigate("/");
          }
          setLoggedIn(response.data.loggedIn);
          setEmail(response.data.userDetails.email);
          setArray(response.data.userFavourites);
          if(response.data.userFavourites.length===0){
            setCount("No Favourites")
          }
          setImage(response.data.userDetails.image);
        } else {
          console.log("error");
        }
      } catch (err) {
        console.log(err);
      }
    };
    validate();
  }, []);

    return (
     
      <div style={{overflowX:"hidden",marginLeft:"auto",marginRight:"auto",backgroundColor:"#101418",color:"white" }}>
        <div>
        <div className="row" style={{width:"315px",marginLeft:"auto",marginRight:"auto",marginTop:"2.5rem"}}>
        <div className="col-sm-3 col-md-3 col-lg-3">
        <div>
        <Avatar style={{margin:"auto"}}
        alt="Remy Sharp"
        src={userImage}
        sx={{ width: 50, height: 50 }}
        />
        </div>
        </div>
        <div className="col-sm-9 col-md-9 col-lg-9" >
        <div style={{margin:"auto",textAlign:"center",marginTop:"1rem"}}>{userEmail}</div>
        </div>
        </div>
  
        <div style={{width:"90%",marginLeft:"auto",marginRight:"auto",marginTop:"3rem"}}>
        <div style={{width:"50%",marginLeft:"20px",fontSize:"2rem"}}>{count}</div>
        <div>
  
        <div style={{ padding: "20px 20px 20px 20px" }}>
        <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
        >
        <Masonry gutter="20px">
        {imagesArray.map((image, i) => (
        <div style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
        <ImageWithDownloadBar imageData={image} fav={false} update={deleteElement}>
        <img
        src={image.src.original}
        style={{ width: "100%", display: "block" }}
        alt=""
        id={image.id}
        loading="lazy"
        />
        </ImageWithDownloadBar>
        </div>
        ))}
        </Masonry>
        </ResponsiveMasonry>
        </div>
        </div>
        </div>
        </div>
      </div>
    );
  

};

export default Profile;
