import React, { useState, useContext, useEffect } from 'react';
import Header from '../layout/Header.jsx';
import Toast from "../components/Toast.jsx";
import { Crud } from '../../classes/Crud.js';
import { Context } from '../../main.jsx';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader.jsx';

const UpdateService = () => {

    const obj = new Crud();

    const { id } = useParams();

    const {
        loading, setLoading,
        error, setError,
        isError, setIsError,
        success,
        isSuccess,
        arePostsFound, setArePostsFound,
        showAlert, showSuccess
    } = useContext(Context);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        setLoading(true);
        fetchService();
    }, []);

    //getting service data
    const fetchService = async () => {
        const data = await obj.get(`/service/api/get/single/${id}`, { method: "POST" });
        setLoading(false);
        if (data.success) {
            setTitle(data.service.title);
            setDescription(data.service.description);
            setArePostsFound(true);
        } else {
            setIsError(true);
            setError(data.message);
        }
    };

    //verifying whether the required data is provided ?
    const verify = () => {
        if (title === "" || description === "") {
            showAlert("All the fields are necessary!");
            return false;
        }
        return true;
    };

    //updating the service
    const HandelSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (verify()) {
            const data = await obj.set(
                `/service/api/update/${id}`,
                "PUT",
                { title, description },
                { "Content-Type": "application/json" },
                false
            );
            setLoading(false);
            if (data.success) {
                setTitle("");
                setDescription("");
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
                        <div className="container mt-5" id='add_service'>
                            {
                                isError || isSuccess
                                    ? <Toast cls={isError ? "bg-danger" : "bg-success"} message={isError ? error : success} />
                                    : null
                            }
                            <div className="heading mb-3">
                                <h1 className="m-0 p-0">Edit Service</h1>
                            </div>
                            <form onSubmit={HandelSubmit} className='d-flex flex-column align-items-center mx-auto'>
                                <div className="w-100 form-group mb-3">
                                    <label htmlFor="title">Service title</label>
                                    <input type="text" className="form-control" id="title" value={title} onChange={e => setTitle(e.target.value)} />
                                </div>
                                <div className="w-100 form-group mb-3">
                                    <label htmlFor="description">Description</label>
                                    <textarea name="" id="description" className='w-100 p-3' onChange={e => setDescription(e.target.value)} value={description}></textarea>
                                </div>
                                <div className="w-100 form-group ">
                                    <button type='submit' className="btn adminBtn text-light">
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

export default UpdateService;