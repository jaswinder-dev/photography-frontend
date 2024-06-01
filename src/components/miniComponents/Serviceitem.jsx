/**service item */
import React from 'react';

const ServiceItem = (prop) => {
    return (
        <div className="service" data-aos="fade-up">
            <div className="heading">
                <h2 className="m-0 p-0 text-center text-light">{prop.title}</h2>
                <h2 className="m-0 p-0 text-center text-light">~</h2>
            </div>
            <p className="m-0 p-0 text-center">{prop.description}</p>
        </div>
    );
}

export default ServiceItem;