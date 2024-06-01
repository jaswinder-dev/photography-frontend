import React, { useContext, useEffect, useState } from 'react';
import Loader from '../components/Loader.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { Crud } from '../../classes/Crud.js';
import { Context } from '../../main.jsx';
import Toast from '../components/Toast.jsx';

const DeleteTestimony = () => {

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


    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [testimomy, setTestimony] = useState("");

    //will be used to show alert box for
    const [isAlerted, setIsAlerted] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchTestimony();
    }, []);

    //fetching the testimony data
    const fetchTestimony = async () => {
        const data = await obj.get(`/testimony/api/get/single/${id}`, { method: "POST" })
        setLoading(false);
        if (data.success) {
            console.log(data);
            setName(data.testimony.name);
            setImage(data.testimony.image);
            setTestimony(data.testimony.testimony);
            setArePostsFound(true);
        } else {
            showAlert(data.message);
        }
    };

    //deleting the testimony data
    const deletingAction = async () => {
        setLoading(true);
        const data = await obj.delete(`/testimony/api/delete/${id}`);
        if (data.success) {
            navigate(prevURL);
        } else {
            showAlert(data.message);
        }
    };

    //cancellign the deletion
    const cancelDeletion = () => {
        navigate(prevURL);
    };

    return (
        loading && !arePostsFound //data is being loaded
            ?
            <Loader />
            :
            <>
                <article className='p-4 mt-5 position-relative' id='profile'>
                    {
                        isAlerted
                            ?
                            <div className="alertBox position-absolute mt-2 mb-3 rounded alert alert-danger w-100 py-3">
                                <p className="text-center m-0 p-0">Delete this testimony ?</p>
                                <div className="d-flex justify-content-around align-items-center my-3">
                                    <button className="btn adminBtn text-light bg-primary" onClick={deletingAction}>Yes</button>
                                    <button className="btn adminBtn text-light bg-danger" onClick={cancelDeletion}>No</button>
                                </div>
                            </div>
                            :
                            null
                    }
                    <div className="heading mb-3">
                        <h3 className='m-0 p-0 text-center'>{name}</h3>
                    </div>
                    {
                        isError
                            ?
                            <Toast cls={"bg-danger"} message={error} />
                            :
                            null
                    }
                    <div className="profilePicture d-flex flex-column justify-content-center align-items-center">
                        <div className="profilePicWrapper">
                            <img src={image} alt="testimony image" className="img-fluid" />
                        </div>
                        <p className="text-center mt-3 p-0">{testimomy}</p>
                    </div>
                </article>
                <div className="actionBtns d-flex justify-content-around align-items-center my-2">
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

export default DeleteTestimony;