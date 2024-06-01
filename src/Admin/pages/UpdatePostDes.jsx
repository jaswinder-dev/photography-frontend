import React, { useContext, useEffect, useState } from 'react';
import Toast from '../components/Toast.jsx'
import Loader from '../components/Loader.jsx';
import Header from '../layout/Header.jsx';
import { useParams } from 'react-router-dom';
import { Crud } from '../../classes/Crud.js';
import { Context } from '../../main.jsx';

const UpdatePostDes = () => {

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
    const [description, setDescription] = useState("");

    useEffect(() => {
        setLoading(true);
        fetchPost();
    }, []);

    //fetching the image data
    const fetchPost = async () => {
        const data = await obj.get(`/post/api/get/single/${id}`, { method: "POST" });
        setLoading(false);
        if (data.success) {
            setImage(data.post.image);
            setDescription(data.post.description);
            setArePostsFound(true);
        }
    };

    //updating the description
    const updateDescription = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = await obj.set(`/post/api/update/${id}`,
            "PUT",
            { description },
            { "Content-Type": "application/json" },
            false
        );
        setLoading(false);
        if (data.success) {
            showSuccess(data.message);
            setDescription("");
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
                        <article className="rounded py-4 px-4 mt-5" id='addImages'>
                            {
                                (isError || isSuccess)
                                    ? <Toast cls={isError ? "bg-danger" : "bg-success"} message={isError ? error : success} />
                                    : null
                            }
                            <div className="heading mb-3">
                                <h2 className="m-0 p-0">Update Description</h2>
                            </div>
                            <div className="mainContainer d-flex justify-content-between">
                                <div className="imgWrapper mb-2">
                                    <img src={image} alt="image" className='img-fluid' />
                                </div>
                                <form onSubmit={updateDescription}>
                                    <div className="form-group mb-3">
                                        <label htmlFor="#description">Give Description</label>
                                        <textarea className='form-control' name="description" id="description" cols="30" rows="3" value={description} onChange={e => setDescription(e.target.value)}></textarea>
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

export default UpdatePostDes;