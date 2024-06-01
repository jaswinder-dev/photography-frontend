import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../layout/Header.jsx';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Loader from '../components/Loader.jsx';
import { ROUTE } from '../../../config/env.js';
import { Crud } from '../../classes/Crud.js';
import { Context } from '../../main';
import Toast from '../components/Toast.jsx';

const AllTestimonies = () => {

    const [testimonies, setTestimonies] = useState([]);

    const {
        loading, setLoading,
        error,
        isError,
        arePostsFound, setArePostsFound,
        showAlert
    } = useContext(Context);

    useEffect(() => {
        setLoading(true);
        fetchTestimonials();
    }, []);

    //fetching testimony data
    const fetchTestimonials = async () => {
        const obj = new Crud();
        const data = await obj.get(`/testimony/api/get`);
        setLoading(false);
        if (data.success) {
            setTestimonies(data.testimonies);
            setArePostsFound(true);
        } else {
            showAlert(data.message);
        }
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
                                {
                                    isError
                                        ? <Toast cls={"bg-danger"} message={error} />
                                        : null
                                }
                                <div className="heading d-flex justify-content-between align-items-center py-2">
                                    <h1>Testimonies</h1>
                                    <div className="addBtn">
                                        <Link to={`/admin/${ROUTE}/add/testimony`} className='rounded text-light adminBtn'>Add</Link>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover table-stripped">
                                        <thead>
                                            <tr className='text-light'>
                                                <th>Sr.no</th>
                                                <th>Name</th>
                                                <th>Email/Phone</th>
                                                <th>Description</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                testimonies.length > 0
                                                    ?
                                                    testimonies.map((testimony, index) =>
                                                        < tr key={++index}>
                                                            <td>{++index}.</td>
                                                            <td>{testimony.name}</td>
                                                            <td>{testimony.email}/ {testimony.phone}</td>
                                                            <td>{(testimony.testimony).slice(0, 30) + "..."}</td>
                                                            <td>
                                                                <Link to={`/admin/${ROUTE}/update/testimony/${testimony._id}`} className="p-0 edit-btn btn btn-sm text-success"><FaEdit /></Link>
                                                                <Link to={`/admin/${ROUTE}/delete/testimony/${testimony._id}/${encodeURIComponent(location.pathname)}`} className="p-0 delete-btn btn btn-sm text-danger"><MdDelete /></Link>
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

export default AllTestimonies;