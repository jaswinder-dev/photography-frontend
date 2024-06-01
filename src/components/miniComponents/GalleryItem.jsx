/**gallery item *********************************************************/

import React from 'react';

const GalleryItem = (prop) => {
    return (
        <div className={prop.cls} data-aos={"fade-up"}>
            <img src={prop.img} alt="IMG" className="img-fluid" />
        </div>
    );
}

export default GalleryItem;