import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Toast from '../components/Toast';
import { Crud } from '../../classes/Crud.js';
import { Context } from "../../main";

const DeletePost = () => {

    const obj = new Crud();

    const navigate = useNavigate();

    //'id' of the blog
    const { id } = useParams();
    // 'url' of the previous page (will be used in cancelling the deletion)
    const { prevURL } = useParams();

    const {
        loading, setLoading,
        arePostsFound, setArePostsFound,
        error,
        isError,
        showAlert
    } = useContext(Context);

    const [image, setImage] = useState({});

    //will be used to show alert box for
    const [isAlerted, setIsAlerted] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchPost();
    }, []);

    //fetching the post data
    const fetchPost = async () => {
        const data = await obj.get(`/post/api/get/single/${id}`, { method: 'POST' });
        setLoading(false);
        if (data.success) {
            setImage(data.post.image);
            setArePostsFound(true);
        } else {
            showAlert(data.message);
        }
    };

    //deleting the post
    const deletingAction = async () => {
        setLoading(true);
        setIsAlerted(false);
        const data = await obj.delete(`/post/api/delete/${id}`);
        if (data.success) {
            navigate(prevURL);
        } else {
            showAlert(data.message);
        }
    };

    //cancelling the deletion
    const cancelDeletion = () => {
        navigate(prevURL);
    };

    return (
        loading && !arePostsFound
            ?
            <Loader />
            :
            <>
                <article className='p-4 mt-5 position-relative' id='profile'>
                    {
                        isAlerted
                            ?
                            <div className="alertBox position-absolute mt-2 mb-3 rounded alert alert-danger w-100 py-3">
                                <p className="text-center m-0 p-0"> Delete this post ?</p>
                                <div className="d-flex justify-content-around align-items-center my-3">
                                    <button className="btn adminBtn text-light bg-primary" onClick={deletingAction}>Yes</button>
                                    <button className="btn adminBtn text-light bg-danger" onClick={cancelDeletion}>No</button>
                                </div>
                            </div>
                            :
                            null
                    }
                    {
                        isError
                            ?
                            <Toast cls={"bg-danger"} message={error} />
                            :
                            null
                    }
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="imageWrapper">
                            <img src={image} alt="prifile image" className="img-fluid" />
                        </div>
                    </div>
                </article>
                <div className="actionBtns d-flex justify-content-around align-items-center my-3">
                    <button className="btn adminBtn text-light" onClick={e => { setIsAlerted(true); setLoading(true); }}>
                        {
                            loading
                                ? <div className="spinner-border spinner-border-sm"></div>
                                : <>Delete</>
                        }
                    </button>
                    <button className="btn adminBtn text-light bg-danger" onClick={cancelDeletion}>Cancel</button>
                </div>
            </>
    );
}

export default DeletePost;