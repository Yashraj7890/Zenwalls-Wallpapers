import React, { useState } from 'react';
import '../index.css';


const Search = ({ update }) => {
    const [searchValue, setSearchValue] = useState("");
    const handleClick = (value) => {
        update(value);
    }

    return (
    <div style={{
        textAlign: "center",
        marginTop: "4rem",
        marginBottom: "3rem",
    }}>
    <span style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
    <input type="text" style={{ height: "2.2rem", width: "14rem",borderRadius:"3px" }} placeholder="  Search..." className="inputSearch" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}></input>
    <button onClick={() => handleClick(searchValue)} className='btn btn-outline-light' style={{marginLeft:"0.5rem"}}>
    <i className="fa-solid fa-magnifying-glass"></i></button>
    </span>
    </div>)
}
export default Search;