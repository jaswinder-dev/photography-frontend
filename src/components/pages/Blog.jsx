import React, { useEffect, useState } from 'react';
import PortfolioFooter from '../miniComponents/PortfolioFooter';
import { useParams } from 'react-router-dom';
import { Crud } from '../../classes/Crud';

const Blog = () => {

    const { id } = useParams();

    const [blog, setBlog] = useState({});

    useEffect(() => {
        fetchBlog();
    }, []);

    //fetching latest blog
    const fetchBlog = async () => {
        const obj = new Crud();
        const data = await obj.get(`/blog/api/get/${id}`, { method: "POST" });
        if (data.success) {
            setBlog(data.blog);
        }
    };

    return (
        <>
            <section id="blog" className="py-5" style={{ backgroundColor: "var(--backGround-gray)" }} >
                <div className="container">
                    <div className="heading mb-3">
                        <h2>{blog.title}</h2>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mt-2 mb-3">
                            <img src={blog.image} alt="blog image" className="img-fluid" />
                        </div>
                        <div className="col-md-6">
                            <div dangerouslySetInnerHTML={{ __html: blog.description }} />
                        </div>
                    </div>
                </div>
            </section>
            <PortfolioFooter />
        </>
    );
}

export default Blog;