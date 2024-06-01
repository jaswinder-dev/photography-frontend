import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../layout/Header';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaImage } from "react-icons/fa6";
import Loader from '../components/Loader';
import { ROUTE } from '../../../config/env.js';
import { Crud } from '../../classes/Crud.js';
import { Context } from '../../main.jsx';

const AllBlogs = () => {

    const [blogs, setBlogs] = useState([]);

    const {
        loading, setLoading,
        arePostsFound, setArePostsFound
    } = useContext(Context);

    useEffect(() => {
        setLoading(true);
        fetchBlogs();
    }, []);

    //fetching blog data
    const fetchBlogs = async () => {
        const obj = new Crud();
        const data = await obj.get("/blog/api/get");
        if (data.success) {
            setBlogs(data.blogs);
            setLoading(false);
            setArePostsFound(true);
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
                                <div className="heading d-flex justify-content-between align-items-center py-2">
                                    <h1>Blogs</h1>
                                    <div className="addBtn">
                                        <Link to={`/admin/${ROUTE}/add/blog`} className='rounded text-light adminBtn'>Add</Link>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover table-stripped">
                                        <thead>
                                            <tr className='text-light'>
                                                <th>Sr.no</th>
                                                <th>Title</th>
                                                <th>author</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        {
                                            blogs.length > 0
                                                ?
                                                <tbody>
                                                    {
                                                        blogs.map((blog, index) =>
                                                            <tr key={++index}>
                                                                <td>{++index}.</td>
                                                                <td>{blog.title}</td>
                                                                <td>{blog.author}</td>
                                                                <td>
                                                                    <Link to={`/admin/${ROUTE}/update/blog/image/${blog._id}`} className="p-0 edit-btn btn btn-sm text-primary"><FaImage /></Link>
                                                                    <Link to={`/admin/${ROUTE}/update/blog/${blog._id}`} className="p-0 edit-btn btn btn-sm text-success"><FaEdit /></Link>
                                                                    <Link to={`/admin/${ROUTE}/delete/blog/${blog._id}/${encodeURIComponent(location.pathname)}`} className="p-0 delete-btn btn btn-sm text-danger"><MdDelete /></Link>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                                : null
                                        }
                                    </table>
                                </div>
                            </div>
                        </section>
                    </>
            }
        </>
    );
}

export default AllBlogs;