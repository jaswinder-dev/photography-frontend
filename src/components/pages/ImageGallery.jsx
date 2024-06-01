import React, { useEffect, useState } from 'react';
import PortfolioFooter from '../miniComponents/PortfolioFooter';
import { Crud } from '../../classes/Crud';

const ImageGallery = () => {

    const [images, setImages] = useState([]);

    useEffect(() => {
        fetchImages();
    }, []);

    //getting the images
    const fetchImages = async () => {
        const obj = new Crud();
        const data = await obj.get("/post/api/get");
        if (data.success) {
            setImages(data.posts);
        }
    };

    return (
        <>
            <section className="py-5">
                <div className="heading mb-3">
                    <h1 className="m-0 p-0 text-center">Browse My Gallery</h1>
                </div>
                <section className='imageGallery px-4 mt-5' id='imageGallery'>
                    {
                        images.map((image, index) =>
                            <div className="box mb-2 overflow-hidden" id={++index}>
                                <img src={image.image} alt="IMG" className='img-fluid' />
                            </div>
                        )
                    }
                </section>
            </section>
            <PortfolioFooter />
        </>
    );
}

export default ImageGallery;