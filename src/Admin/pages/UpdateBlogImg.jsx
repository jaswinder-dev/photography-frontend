import React, { useContext, useEffect, useState } from 'react';
import Toast from '../components/Toast.jsx'
import Loader from '../components/Loader.jsx';
import Header from '../layout/Header.jsx';
import { useParams } from 'react-router-dom';
import { Crud } from '../../classes/Crud.js';
import { Context } from '../../main.jsx';

const UpdateBlogImg = () => {

    const { id } = useParams();

    const obj = new Crud();

    const {
        loading, setLoading,
        arePostsFound, setArePostsFound,
        error,
        isError,
        success,
        isSuccess,
        showAlert, showSuccess
    } = useContext(Context);

    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState("");

    useEffect(() => {
        setLoading(true);
        fetchImage();
    }, []);

    //fetching the image data
    const fetchImage = async () => {
        const data = await obj.get(`/blog/api/get/${id}`, { method: "POST" });
        setLoading(false);
        if (data.success) {
            setImagePreview(data.blog.image);
            setArePostsFound(true);
        } else {
            setImagePreview("");
        }
    };

    //file handeling
    const fileHandeler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(file);
            setImagePreview(reader.result);
        };
    };

    //verifying whether the required data is provided ?
    const verify = () => {
        if (image === "") {
            showAlert("No Image choosen!");
            return false;
        }
        return true;
    };

    //updating the image
    const updateImage = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (verify()) {
            const formData = new FormData();
            formData.append('image', image);
            const data = await obj.set(`/blog/api/update/image/${id}`,
                "PUT",
                formData,
                null,
                true
            );
            setLoading(false);
            if (data.success) {
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
                        <article className="rounded py-4 px-4 mt-5" id='addImages'>
                            {
                                (isError || isSuccess)
                                    ? <Toast cls={isError ? "bg-danger" : "bg-success"} message={isError ? error : success} />
                                    : null
                            }
                            <div className="heading mb-3">
                                <h2 className="m-0 p-0">Update blog image</h2>
                            </div>
                            <div className="mainContainer d-flex justify-content-between">
                                <div className="imgWrapper mb-2">
                                    <img src={imagePreview} alt="image" className='img-fluid' />
                                </div>
                                <form onSubmit={updateImage}>
                                    <div className="form-group mb-3">
                                        <label htmlFor="">Choose Picture</label>
                                        <input type="file" className="form-control" onChange={fileHandeler} />
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
                        </article>
                    </>
            }
        </>
    );
}

export default UpdateBlogImg;