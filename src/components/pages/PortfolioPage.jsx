import React, { useEffect, useState } from 'react';
import PortfolioFooter from '../miniComponents/PortfolioFooter';
import { useParams } from 'react-router-dom';
import { Crud } from '../../classes/Crud';

const PortfolioPage = () => {

    //id of the portfolio
    const { id } = useParams();

    //title of the portfolio
    const { title } = useParams();

    const [images, setImages] = useState([]);

    useEffect(() => {
        fetchImages();
    }, []);

    //fetching the images regarding the 'id' of the portfolio
    const fetchImages = async () => {
        const obj = new Crud();
        const data = await obj.get(`/post/api/get/query/${JSON.stringify({ portfolio: id })}`, { method: "POST" });
        if (data.success) {
            setImages(data.posts);
        }
    };

    return (
        <>
            <section className="py-5">
                <div className="heading mb-3">
                    <h1 className="m-0 p-0 text-center">Browse My {title} Portfolio</h1>
                </div>
                <section className='imageGallery px-4 mt-5' id='imageGallery'>
                    {
                        images.map((image, index) =>
                            <div className="box mb-2" key={++index}>
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

export default PortfolioPage;