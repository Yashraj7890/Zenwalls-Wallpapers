import React from 'react';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ImageWithDownloadBar from './ImageDownloadBar';

const ImageGallery = ({ imageUrls }) => {
  return (
    <div style={{ padding: "20px 20px 20px 20px" }}>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry gutter="20px">
        {imageUrls.map((image, i) => (
        <div  style={{ backgroundColor: "rgba(0, 0, 0, 0.3)"}}>
        <ImageWithDownloadBar imageData={image} fav={true} >
        <img
        src={image.src.original}
        style={{ width: "100%", display: "block" }}
        alt=""
        id={image.id}
        loading='lazy'
        />
        </ImageWithDownloadBar>
        </div>
        ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default ImageGallery;
