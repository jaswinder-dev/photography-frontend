import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Crud } from '../../classes/Crud';

const LatestBlog = () => {

    const [blog, setBlog] = useState({});
    const [description, setDescription] = useState("");

    useEffect(() => {
        fetchLatestBlog();
    }, []);

    //getting the latest blog
    const fetchLatestBlog = async () => {
        const obj = new Crud();
        const data = await obj.get("/blog/api/get/latest");
        if (data.success) {
            setBlog(data.blog[0]);
            setDescription(data.blog[0].description.slice(0, 200));
        }
    };

    return (
        <section id="latestBlog" className='py-5'>
            <div className="container d-flex justify-content-end">
                <div className="wrapper p-5">
                    <div className="heading mb-3">
                        <h1 className="text-center text-light m-0 p-0">~ LATEST BLOG ~</h1>
                    </div>
                    <div className="blog">
                        <div className="heading mb-3">
                            <h2 className="text-center text-light m-0 p-0">{blog.title}</h2>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: description }} />
                        <div className="readMoreBtn my-5 text-center">
                            <Link to={`/blog/${blog._id}`} className='text-light'>READ MORE</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LatestBlog;