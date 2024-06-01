import React, { useContext, useState } from 'react';
import { ROUTE } from '../../../config/env.js';
import defaultImg from "../../assets/default.png";
import Header from '../layout/Header';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Context } from '../../main';
import { Crud } from "../../classes/Crud.js";
import Toast from '../components/Toast.jsx';
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {

    const navigate = useNavigate();

    const { loading, setLoading, error, isError, showAlert } = useContext(Context);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState(defaultImg);

    //modules for react-quill
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean'],
        ]
    };

    //formats for react-quill
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    //resetting the fields
    const reset = () => {
        setTitle("");
        setDescription("");
        setImage("");
        setImagePreview(defaultImg);
    };

    //file handling 
    const fileHandeler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(file);
            setImagePreview(reader.result);
        };
    };

    //vefifying whether required data is provided ?
    const verify = () => {
        if (title === "" || image === "" || description === "") {
            showAlert("All the fields are necessary!");
            return false;
        }
        if (description.length < 200) {
            showAlert("Description should be at least 100 character long!");
            return false;
        }
        return true;
    };

    //adding the blog
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (verify()) {
            const photographer = JSON.parse(localStorage.getItem('photographer'));
            const author = photographer.data.username;
            const author_id = photographer.data._id;
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("author", author);
            formData.append("author_id", author_id);
            formData.append("image", image);
            const obj = new Crud();
            const data = await obj.set(
                "/blog/api/add/blog",
                "POST",
                formData,
                null,
                true
            );
            setLoading(false);
            if (data.success) {
                reset();
                navigate(`/admin/${ROUTE}/blogs`);
            } else {
                showAlert(data.message);
            }
        }
    };

    return (
        <>
            <Header />
            <div className="container py-5" id='add_blog'>
                {
                    isError
                        ? <Toast cls={"bg-danger"} message={error} />
                        : null
                }
                <div className="heading mb-3">
                    <h1 className="m-0 p-0">Add Blog</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="#title">Title</label>
                        <input type="text" id='title' className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className="img_wrapper mb-3">
                        <img src={imagePreview} alt="blog image" className="img-fluid" />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="#title">Choose a picture</label>
                        <input type="file" id='title' className="form-control" onChange={fileHandeler} />
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
                                    : <>Add</>
                            }
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddBlog;