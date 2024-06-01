import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Header from '../layout/Header';
import { MdDelete } from "react-icons/md";
import { IoMdImage } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import Spinner from '../components/Spinner';
import { ROUTE } from '../../../config/env.js';
import { Crud } from '../../classes/Crud.js';
import { Context } from '../../main.jsx';

const MyImages = () => {

    const { id } = useParams();

    const location = useLocation(window.location.href);

    const {
        loading, setLoading,
        arePostsFound, setArePostsFound
    } = useContext(Context);

    const [allPosts, setPosts] = useState([]);

    useEffect(() => {
        setLoading(true);
        getImages();
    }, []);

    //getting the images of the photographer
    const getImages = async () => {
        const obj = new Crud();
        const data = await obj.get(`/post/api/get/individual/${id}`, {
            method: "POST"
        });
        setLoading(false);
        if (data.success) {
            setPosts(data.posts);
            setArePostsFound(true);
        }
    };

    return (
        <>
            <Header />
            <section className="py-5" id='allImages'>
                <div className="container">
                    <div className="heading py-2">
                        <h1>My posts</h1>
                    </div>
                    {
                        (loading && !arePostsFound)
                            ?
                            <Spinner />
                            :
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
                                                        <p className="m-0 p-0">{post.description}</p>
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
                                </table>

                            </div>
                    }
                </div>
            </section>
        </>
    );
}

export default MyImages;