import React, { useContext, useEffect, useState } from 'react';
import Loader from '../components/Loader';
import Toast from '../components/Toast.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTE } from '../../../config/env.js';
import { Crud } from '../../classes/Crud.js';
import { Context } from '../../main';

const DeletePhotographer = () => {

    const obj = new Crud();

    const navigate = useNavigate();

    //'id' of the blog
    const { id } = useParams();
    // 'url' of the previous page (will be used in cancelling the deletion)
    const { prevURL } = useParams();

    const {
        loading, setLoading,
        error,
        isError,
        arePostFound, setArePostsFound,
        showAlert
    } = useContext(Context);

    const [photographer, setPhotographer] = useState({});

    //will be used to show alert box for
    const [isAlerted, setIsAlerted] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchPhotographer();
    }, []);

    //fetching the photographer data
    const fetchPhotographer = async () => {
        const data = await obj.get(`/photographer/api/single/${id}`, { method: "POST" })
        setLoading(false);
        if (data.success) {
            setArePostsFound(true);
            setPhotographer(data.photographer);
        } else {
            showAlert(data.message);
        }
    };

    //deleting the photographer
    const deletingAction = async () => {
        setIsAlerted(false);
        const data = await obj.delete(`/photographer/api/delete/${id}`);
        setLoading(false);
        if (data.success) {
            navigate(prevURL);
        } else {
            showAlert(data.message);
        }
    };

    //cancellign the deletion
    const cancelDeletion = () => {
        setLoading(false);
        navigate(prevURL);
    };

    return (
        loading && !arePostFound //data is being loaded
            ?
            <Loader />
            :
            <>
                <article className='p-4 mt-5 position-relative' id='profile'>
                    {
                        isAlerted
                            ?
                            <div className="alertBox position-absolute mt-2 mb-3 rounded alert alert-danger w-100 py-3">
                                <p className="text-center m-0 p-0">Deleting this photographer will also delete his posts. Do you want to continue ?</p>
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
                    <div className="heading mb-3">
                        <h3 className='m-0 p-0 text-center'>@{photographer.username}</h3>
                    </div>
                    <div className="profilePicture d-flex justify-content-center align-items-center">
                        <div className="profilePicWrapper">
                            <img src={photographer.avatar} alt="prifile image" className="img-fluid" />
                        </div>
                    </div>
                    <div className="text-center mt-3">
                        <p className='m-0 p-0'><b>{photographer.fullname}</b></p>
                    </div>
                    <div className="text-center">
                        <p className='m-0 p-0'><b>{photographer.posts}</b> Posts</p>
                    </div>
                    <div className="text-center">
                        <p className='m-0 p-0'>{photographer.email}</p>
                    </div>
                </article>
                <div className="actionBtns d-flex justify-content-around align-items-center my-3">
                    <button className="btn adminBtn text-light" onClick={e => { setIsAlerted(true); }}>
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

export default DeletePhotographer;