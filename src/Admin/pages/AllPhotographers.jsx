import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../layout/Header';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Loader from '../components/Loader';
import { ROUTE } from '../../../config/env.js';
import { Context } from '../../main';
import { Crud } from '../../classes/Crud.js';

const AllPhotographers = () => {

    const location = useLocation(window.location.href);

    const { loading, setLoading, setError, arePostsFound, setArePostsFound } = useContext(Context);

    const [photographers, setPhotographers] = useState([]);

    useEffect(() => {
        fetchPhotographers();
    }, []);

    //fetching the photographers
    const fetchPhotographers = async () => {
        const obj = new Crud();
        const data = await obj.get("/photographer/api/get");
        if (data.success) {
            setLoading(false);
            setArePostsFound(true);
            setPhotographers(data.photographers);
        } else {
            setError(data.message);
        }
    };

    //making proper date string
    const getDate = (dateString) => {
        const months = ['Jan', 'Feb', 'March', 'April', 'May', "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const date = new Date(dateString);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month},${year}`;
    };

    return (
        <>
            {
                loading && !arePostsFound
                    ? <Loader />
                    : null
            }
            <>
                <Header />
                <section className="py-5" id='allImages'>
                    <div className="container">
                        <div className="heading d-flex justify-content-between align-items-center py-2">
                            <h1>Photographers</h1>
                            <div className="addBtn">
                                <Link to={`/admin/${ROUTE}/photographer/add`} className='rounded text-light adminBtn'>Add</Link>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover table-stripped">
                                <thead>
                                    <tr className='text-light'>
                                        <th>Sr.no</th>
                                        <th>Photographer</th>
                                        <th>Joined on</th>
                                        <th>Posts</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        photographers.length > 0
                                            ?
                                            photographers.map((photographer, index) =>
                                                < tr key={++index}>
                                                    <td>{++index}.</td>
                                                    <td>{photographer.username}</td>
                                                    <td>{getDate(photographer.createdAt)}</td>
                                                    <td>{photographer.posts}</td>
                                                    <td>
                                                        <Link to={`/admin/${ROUTE}/photographer/update/${photographer._id}`} className="p-0 edit-btn btn btn-sm text-success"><FaEdit /></Link>
                                                        <Link to={`/admin/${ROUTE}/delete/photographer/${photographer._id}/${encodeURIComponent(location.pathname)}`} className="p-0 delete-btn btn btn-sm text-danger"><MdDelete /></Link>
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
        </>
    );
}

export default AllPhotographers;