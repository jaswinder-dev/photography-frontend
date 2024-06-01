import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../layout/Header.jsx';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Loader from '../components/Loader';
import { ROUTE } from '../../../config/env.js';
import { Crud } from '../../classes/Crud.js';
import { Context } from '../../main';

const AllServices = () => {

    const [services, setServices] = useState([]);

    const { loading, setLoading, setError, arePostsFound, setArePostsFound } = useContext(Context);

    useEffect(() => {
        setLoading(true);
        fetchServices();
    }, []);

    //fetching service data
    const fetchServices = async () => {
        const obj = new Crud();
        const data = await obj.get("/service/api/get");
        if (data.success) {
            if (data.services.length > 0) {
                setServices(data.services);
                setArePostsFound(true);
            } else {
                setError("No services found!");
            }
        } else {
            setError(data.message);
        }
        setLoading(false);
    };

    return (
        <>
            {
                loading && !arePostsFound
                    ? <Loader />
                    :
                    <>
                        <Header />
                        <section className="py-5" id='allImages'>
                            <div className="container">
                                <div className="heading d-flex justify-content-between align-items-center py-2">
                                    <h1>Services</h1>
                                    <div className="addBtn">
                                        <Link to={`/admin/${ROUTE}/add/services`} className='rounded text-light adminBtn'>Add</Link>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover table-stripped">
                                        <thead>
                                            <tr className='text-light'>
                                                <th>Sr.no</th>
                                                <th>Service</th>
                                                <th>Description</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                services.length > 0
                                                    ?
                                                    services.map((service, index) =>
                                                        < tr key={++index}>
                                                            <td>{++index}.</td>
                                                            <td>{service.title}</td>
                                                            <td>{service.description}</td>
                                                            <td>
                                                                <Link to={`/admin/${ROUTE}/update/service/${service._id}`} className="p-0 edit-btn btn btn-sm text-success"><FaEdit /></Link>
                                                                <Link to={`/admin/${ROUTE}/delete/service/${service._id}/${encodeURIComponent(location.pathname)}`} className="p-0 delete-btn btn btn-sm text-danger"><MdDelete /></Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                    :
                                                    null
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section >
                    </>
            }

        </>
    );
}

export default AllServices;