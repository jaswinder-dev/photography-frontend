import React, { useEffect, useState } from 'react';
import ServiceItem from '../miniComponents/Serviceitem';
import { Crud } from '../../classes/Crud';

const Services = () => {

    const obj = new Crud();

    const [services, setServices] = useState([]);

    useEffect(() => {
        fetchServices();
    }, []);

    //fetching services
    const fetchServices = async () => {
        const data = await obj.get("/service/api/get");
        if (data.success) {
            setServices(data.services);
        }
    };

    return (
        <section id="services" className='py-5'>
            <div className="container">
                <div className="heading mb-3">
                    <h1 className="text-center m-0 p-0 text-light">~ SERVICES ~</h1>
                </div>
                <div className="description text-center px-2 mx-auto">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum mollitia minima saepe a! Quod consequuntur animi illum pariatur dolor soluta a illo officia cupiditate, minima eveniet, qui facere id neque?
                    </p>
                </div>
                <div className="servicesProvided mt-5">
                    {
                        services.map((service, index) =>
                            <ServiceItem key={++index} title={service.title} description={service.description} />
                        )
                    }
                </div>
            </div>
        </section>
    );
}

export default Services;