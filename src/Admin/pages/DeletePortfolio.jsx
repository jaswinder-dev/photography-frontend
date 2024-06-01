import React, { useContext, useEffect, useState } from 'react';
import Loader from '../components/Loader.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { Crud } from '../../classes/Crud.js';
import { Context } from '../../main.jsx';
import Toast from '../components/Toast.jsx';

const DeletePortfolio = () => {

    const obj = new Crud();

    const navigate = useNavigate();

    //'id' of the blog
    const { id } = useParams();
    // 'url' of the previous page (will be used in cancelling the deletion)
    const { prevURL } = useParams();

    const [title, setTitle] = useState("");
    const [posts, setPosts] = useState("");

    const {
        loading, setLoading,
        error,
        isError,
        arePostsFound, setArePostsFound,
        showAlert
    } = useContext(Context);

    //will be used to show alert box for
    const [isAlerted, setIsAlerted] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchPortfolio();
    }, []);

    //fetching the portfolio data
    const fetchPortfolio = async () => {
        const data = await obj.get(`/portfolio/api/get/${id}`, { method: 'POST' });
        setLoading(false);
        if (data.success) {
            setTitle(data.portfolio.title);
            setPosts(data.portfolio.posts);
            setArePostsFound(true);
        } else {
            showAlert(data.message);
        }
    };

    //deleting the portfolio
    const deletingAction = async () => {
        setIsAlerted(false);
        setLoading(true);
        const data = await obj.delete(`/portfolio/api/delete/${id}`);
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
        loading && !arePostsFound//data is being loaded
            ?
            <Loader />
            :
            <>
                <article className='p-4 mt-5 position-relative' id='profile'>
                    {
                        isAlerted
                            ?
                            <div className="alertBox position-absolute mt-2 mb-3 rounded alert alert-danger w-100 py-3">
                                <p className="text-center m-0 p-0">Deleting this portfolio will also delete posts under it. Do you want to continue ?</p>
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
                    <div className="profilePicture d-flex justify-content-center align-items-center">
                        <h1 className="m-0 p-0">{title}</h1>
                    </div>
                    <div className="text-center mt-3">
                        <p className='m-0 p-0'><b>Posts : <span>{posts}</span></b></p>
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

export default DeletePortfolio;