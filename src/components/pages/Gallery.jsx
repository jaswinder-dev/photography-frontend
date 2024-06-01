import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GalleryItem from '../miniComponents/GalleryItem';
import { Crud } from '../../classes/Crud';

const Gallery = () => {

    const [images, setImages] = useState([]);

    useEffect(() => {
        fetchImages();
    }, []);

    //getting the latest images (15 in total)
    const fetchImages = async () => {
        const obj = new Crud();
        const data = await obj.get("/post/api/get/latest");
        if (data.success) {
            setImages(data.posts);
        }
    };

    return (
        <section id="gallery" className='py-5'>
            <div className="container">
                <div className="heading mb-3">
                    <h1 className="text-center m-0 p-0">~ GALLERY ~</h1>
                </div>
                <div className="galleryImages">
                    {
                        images.map((image, index) =>
                            <GalleryItem img={image.image} cls={'box overflow-hidden'} key={++index} />
                        )
                    }
                </div>
                <div className="viewBtn text-center my-3">
                    <Link to={"/images"} className="text-light">VIEW GALLERY</Link>
                </div>
            </div>
        </section>
    );
}

export default Gallery;