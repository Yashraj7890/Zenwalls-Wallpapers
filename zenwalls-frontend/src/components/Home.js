import React, { useState, useEffect, useContext } from 'react';
import "../index.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [status, setLoggedIn] = useState(false);
    const [showA, setShowA] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        window.open("https://zenwalls-wallpapers.onrender.com/auth/google/callback", "_self")
    }
    const handleClick=()=>{
        navigate("/main");
    }

    const bodyStyle = {
        backgroundColor: '#101418',
        height: "100vh",
        width: "100vw"
    }
    const navHeading = {
        color: "white",
        fontSize: "1.4rem"
    }

    useEffect(() => {
        const validate = async () => {
            try {
                const response = await axios.get("https://zenwalls-wallpapers.onrender.com/validate", { withCredentials: true })
                setLoggedIn(response.data.loggedIn);
            }
            catch (err) {
                console.log(err);
            }
        }
        validate();
    }, []);
    useEffect(() => {
        const timeout1 = setTimeout(() => {
          setShowA(true);
        }, 1000);
    
        const timeout2 = setTimeout(() => {
          setShowA(false);
        }, 5000);
    
        return () => {
          clearTimeout(timeout1);
          clearTimeout(timeout2);
        };
      }, []);
    console.log(status)
        return (
            <div style={bodyStyle}>
                <div>
                <nav className="navbar navigationBar1">
                <div className="container-fluid">
                <span className="navbar-brand mb-0 h1" style={navHeading}>ZenWalls</span>
                </div>
                </nav>
                <div style={{ color: "white" }}>
                <div style={{ fontSize: "3rem", textAlign: "center", fontFamily: "Montserrat,sans-serif", marginTop: "12rem", marginBottom: "3rem" }}>Welcome to ZenWalls <i className={`fa-solid fa-layer-group ${showA ? 'fa-bounce' : ''}`}></i></div>
                <div style={{ fontSize: "1.1rem", textAlign: "center", marginBottom: "3rem",paddingLeft:"0.6rem",paddingRight:"0.6rem" }}>Transform Your Screen, Inspire Your Space<br></br>
                A webapp to look after all your wallpaper needs .</div>
                <div style={{ textAlign: "center" }}>
                {status ? (<div>
                <button type="button" className="btn btn-primary" onClick={handleClick}>Continue to ZenWalls</button>
                </div>
                ) :
                (<button type="button" className="btn btn-primary" onClick={handleLogin}>Continue with <i className="fa-brands fa-google"></i>oogle</button>
                )}
                </div>
                </div>
                </div>
            </div>
        )   
}

export default Home;