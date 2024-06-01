import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import { Crud } from '../../classes/Crud';

const Testimonials = () => {

    const [testimonies, setTestimonies] = useState([]);

    useEffect(() => {
        fetchTestimonies();
    }, []);

    //fetching testimonies
    const fetchTestimonies = async () => {
        const obj = new Crud();
        const data = await obj.get("/testimony/api/get/reader");
        if (data.success) {
            setTestimonies(data.testimonies);
        }
    };

    //swipper.js for 'automatic unlimited swipping'
    const swiper = new Swiper('.swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 3000
        },
        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },
        // Navigation arrows
        navigation: {
            nextEl: '.actionBtnNext',
            prevEl: '.actionBtnPrev',
        }
    });

    return (
        <section id="testimonials" className='py-5'>
            <div className="container swiper position-relative">
                <div className="heading mb-3">
                    <h1 className="text-center m-0 p-0">~ TESTIMONIALS ~</h1>
                </div>
                <div className="allTestimonies swiper-wrapper">
                    {
                        testimonies.map((testimony, index) =>
                            <div className="testimony swiper-slide mb-5" key={++index}>
                                <div className="position-relative testimonialPic d-flex justify-content-center align-items-center my-3">
                                    <div className="picWrapper">
                                        <img src={testimony.image} alt="CLIENT IMAGE" className='img-fluid' />
                                    </div>
                                    <div className="actionbtn actionBtnPrev position-absolute"><FaChevronLeft /></div>
                                    <div className="actionbtn actionBtnNext position-absolute"><FaChevronRight /></div>
                                </div>
                                <div className="description text-center px-2 mx-auto">
                                    <p className='m-0 p-0'>{testimony.testimony}</p>
                                    <p><b>{testimony.email}</b></p>
                                    <b>{testimony.name}</b>
                                </div>
                            </div>
                        )
                    }
                </div>
                {/* <div className="swiper-pagination"></div> */}
            </div>
        </section>
    );
}

export default Testimonials;