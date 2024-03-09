import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import axios from "axios";
import Categories from './Categories';
import "../index.css"
import { fetchWallpapers } from "../Apis"
import ImageGallery from './ImageGallery';
import Search from './Search';
import swal from 'sweetalert';

const Main = () => {
    const navigate = useNavigate();
    const [status, setLoggedIn] = useState(false);
    const [userprofile, setProfile] = useState("");
    const [images, setImages] = useState([]);
    const [query, setQuery] = useState("Nature");
    const [showPleaseWait, setShowPleaseWait] = useState(true);
    
    const bodyStyle = {
        backgroundColor: '#101418',
        minHeight: '100vh',
    }
    const navHeading = {
        color: "white",
        fontSize: "1.4rem"
    }
    const avatarbox = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        marginRight: "5px"
    }

    const handleClick = () => {
        navigate("/profile");
    };

    const updateQuery = (value) => {
        if (value == "") {
            swal("Error", "Please provide a valid query!", "warning");
        } else {
            setQuery(value);
        }
    };
    const logout=async()=>{
        await axios.get("https://zenwalls-wallpapers.onrender.com/logout", { withCredentials: true });
    }

    useEffect(() => {
        const validate = async () => {
            try {
                const response = await axios.get("https://zenwalls-wallpapers.onrender.com/validate", { withCredentials: true })
                console.log(response)
                if(response.data.loggedIn===false){
                    navigate("/");
                }
                setLoggedIn(response.data.loggedIn);
                setProfile(response.data.userDetails.image);
            }
            catch (err) {
                console.log(err);
            }
        }
        validate();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await fetchWallpapers(query);
                setImages(res.photos);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [query]);
    useEffect(() => {
        const pleaseWaitTimerId = setTimeout(() => {
            setShowPleaseWait(false);
        }, 3000);
        return () => {
            clearTimeout(pleaseWaitTimerId);
            setShowPleaseWait(true);
        };
    }, [query]);


        return (
            <div>
                <div style={bodyStyle}>
                <nav className="navbar navbar-expand-lg navigationBar1">
                <div className="container-fluid">
                <span className="navbar-brand mb-0 h1" style={navHeading}>ZenWalls</span>
                <form className='d-flex'><div style={avatarbox} onClick={handleClick}><Avatar alt="user" src={userprofile} sx={{ width: 28, height: 28 }} className='avatar' /></div><Categories update={updateQuery} /></form>
                </div>
                </nav>
                <div>
                {showPleaseWait ? (
                <div style={{ height: "95vh", width: "97vw", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div>
                <div style={{ textAlign: "center" }}><i className="fa-solid fa-spinner fa-spin" style={{ color: "white", fontSize: "2rem" }}></i></div>
                <div style={{ color: "white", textAlign: "center" }}>Please wait</div>
                </div>
                </div>) 
                :
                (<div>
                 <div>
                 <div style={{ color: "white", textAlign: "center", fontSize: "1.2rem", marginTop: "3rem" }}>Explore our categories or simply browse through our large collection</div>
                 <Search update={updateQuery}></Search>
                 <button onClick={logout}>logg</button>
                 </div>
                 <div style={{ fontSize: "2rem", color: "white", marginLeft: "20px", marginTop: "20px", width: "80vw" }}>"{query}" {images.length} results</div>
                 <ImageGallery imageUrls={images}></ImageGallery>
                 </div>)}
                </div>
                </div>
            </div>

        );

};

export default Main;
