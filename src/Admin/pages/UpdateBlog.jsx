import React, { useContext, useEffect, useState } from 'react';
import Header from '../layout/Header';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Loader from "../components/Loader";
import Toast from '../components/Toast.jsx';
import { Crud } from '../../classes/Crud.js';
import { Context } from '../../main';
import { useParams } from 'react-router-dom';

const UpdateBlog = () => {

    const obj = new Crud();

    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean'],
        ]
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    const {
        loading, setLoading,
        arePostsFound, setArePostsFound,
        error,
        success,
        isSuccess,
        isError,
        showAlert, showSuccess
    } = useContext(Context);

    useEffect(() => {
        setLoading(true);
        fetchBlog();
    }, []);

    //fetching blog data
    const fetchBlog = async () => {
        const data = await obj.get(`/blog/api/get/${id}`, { method: 'POST' });
        setLoading(false);
        if (data.success) {
            setTitle(data.blog.title);
            setDescription(data.blog.description);
            setArePostsFound(true);
        }
    };

    //verifying whether the required data is provided ?
    const vefiry = () => {
        if (title === "" || description === "") {
            showAlert("Title and description are necessary!");
            return false;
        }
        return true;
    };

    //resetting the feilds
    const reset = () => {
        setTitle("");
        setDescription("");
    };

    //updating the blog
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (vefiry()) {
            const data = await obj.set(
                `/blog/api/update/${id}`,
                "PUT",
                { title, description },
                { "Content-Type": "application/json" },
                false
            );
            if (data.success) {
                reset();
                showSuccess(data.message);
            } else {
                showAlert(data.message);
            }
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
                        <div className="container mt-5" id='add_blog'>
                            {
                                isError || isSuccess
                                    ? <Toast cls={isError ? "bg-danger" : "bg-success"} message={isError ? error : success} />
                                    : null
                            }
                            <div className="heading mb-3">
                                <h1 className="m-0 p-0">Update Blog</h1>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label htmlFor="#title">Title</label>
                                    <input type="text" id='title' className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="title">Description</label>
                                    <ReactQuill modules={modules} formats={formats} value={description} onChange={e => setDescription(e)} />
                                </div>
                                <div className="form-group">
                                    <button type='submit' className="btn btn-sm adminBtn text-light">
                                        {
                                            loading
                                                ? <div className="spinner-border spinner-border-sm"></div>
                                                : <>Update</>
                                        }
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>
            }
        </>
    );
}

export default UpdateBlog;