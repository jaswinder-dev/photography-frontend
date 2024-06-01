import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../layout/Header.jsx';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdImage } from "react-icons/io";
import { ROUTE } from '../../../config/env.js';
import Loader from '../components/Loader.jsx';
import { Crud } from '../../classes/Crud.js';
import { Context } from "../../main.jsx";

const AllImages = () => {

    const location = useLocation(window.location.href);

    const [allPosts, setPosts] = useState([]);

    const {
        loading, setLoading,
        arePostsFound, setArePostsFound,
        showAlert
    } = useContext(Context);

    useEffect(() => {
        setLoading(true);
        fetchPosts();
    }, []);

    //fetching the posts
    const fetchPosts = async (id) => {
        const obj = new Crud();
        const data = await obj.get("/post/api/get/specific");
        setLoading(false);
        if (data.success) {
            setArePostsFound(true);
            setPosts(data.posts);
        } else {
            showAlert(data.message);
        }
    };

    return (
        <>
            {
                loading && !arePostsFound
                    ? <Loader />
                    : <>
                        <Header />
                        <section className="py-5" id='allImages'>
                            <div className="container">
                                <div className="heading d-flex justify-content-between align-items-center py-2">
                                    <h1>Posts</h1>
                                    <div className="addBtn">
                                        <Link to={`/admin/${ROUTE}/post/add`} className='rounded text-light adminBtn'>Add</Link>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover table-stripped">
                                        <thead>
                                            <tr className='text-light'>
                                                <th>Sr.no</th>
                                                <th>Picture</th>
                                                <th>Photographer</th>
                                                <th>Date/Description</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        {
                                            allPosts.length > 0
                                                ?
                                                <tbody>
                                                    {
                                                        allPosts.map((post, index) =>
                                                            <tr key={++index}>
                                                                <td>{++index}.</td>
                                                                <td>
                                                                    <div className="picWrapper">
                                                                        <img src={post.image} alt="image" className='img-fluid' />
                                                                    </div>
                                                                </td>
                                                                <td>{post.photographer_name}</td>
                                                                <td>
                                                                    <span>23 Dec, 2024</span>
                                                                    <p className="m-0 p-0">{(post.description).slice(0, 30) + " ..."}</p>
                                                                </td>
                                                                <td>
                                                                    <Link to={`/admin/${ROUTE}/post/update/${post._id}`} className="p-0 edit-btn btn btn-sm text-primary"><IoMdImage /></Link>
                                                                    <Link to={`/admin/${ROUTE}/post/update/description/${post._id}`} className="p-0 edit-btn btn btn-sm text-success"><FaEdit /></Link>
                                                                    <Link to={`/admin/${ROUTE}/post/delete/${post._id}/${encodeURIComponent(location.pathname)}`} className="p-0 delete-btn btn btn-sm text-danger"><MdDelete /></Link>
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

export default AllImages;