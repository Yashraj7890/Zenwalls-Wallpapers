import React, { useState } from 'react';
import { Box } from '@mui/system';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import '../index.css';

export default function Categories({update}) {

    const [state, setState] = React.useState({
        top: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const handleClick=(value)=>{
        update(value);
    }



    const categories = ["Random", "Nature", "Abstract", "Scenery", "Space", "Gradient", "Textures", "Quotes", "Vintage", "Dark"];

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, bgcolor:"#101418" }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
            >
        <div >
            {categories.map((category, index) => (
            <div>
            <div className="box" key={index} style={{color:"white",textAlign:"center",marginTop:"1rem",marginBottom:"1.5rem",cursor:"pointer",padding:"0.7rem"}} onClick={() => handleClick(category)}>{category}</div>
            </div>
            ))}
        </div>
        </Box>
    );

    return (
        <div >
        {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
        <Button onClick={toggleDrawer(anchor, true)}>Categories</Button>
        <Drawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
        PaperProps={{
        sx: {
        backgroundColor: "#101418",
        }
        }}
        >
        {list(anchor)}
        </Drawer>
        </React.Fragment>
        ))}
        </div>
    );
}