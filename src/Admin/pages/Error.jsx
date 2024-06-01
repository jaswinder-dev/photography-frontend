/** will be used as 'Page not found!' */

import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <section id="error" className='d-flex flex-column justify-content-start align-items-center py-5'>
            <div className="heading mb-5">
                <h2 className='m-0 p-0 text-light'>FOG ERROR</h2>
            </div>
            <div className="heading mb-3">
                <h1 className='font-weight-bolder m-0 p-0'>404</h1>
            </div>
            <div className="heading mb-3">
                <h3 className='text-center text-light'>Page not found</h3>
                <p>I tried to catch some fog, but i missed it</p>
            </div>
            <div className="heading mb-3">
                <Link to={"/"} className='text-light py-2 px-4'>Back to Home</Link>
            </div>
            <div className="heading mt-5">
                <p className="m-0 p-0">@jaswinderdev 2024</p>
            </div>
        </section>
    );
}

export default Error;