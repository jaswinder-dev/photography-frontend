import React, { useState, useContext } from 'react';
import Header from '../layout/Header';
import Toast from "../components/Toast";
import { ROUTE } from '../../../config/env.js';
import { Crud } from '../../classes/Crud.js';
import { Context } from '../../main';
import { useNavigate } from 'react-router-dom';

const AddService = () => {

    const navigate = useNavigate();

    const { loading, setLoading, error, isError, showAlert } = useContext(Context);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    //verifying whether the required data is provided ?
    const verify = () => {
        if (title === "" || description === "") {
            showAlert("All the fields are necessary!");
            return false;
        }
        return true;
    };

    //adding the service
    const addService = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (verify()) {
            const obj = new Crud();
            const data = await obj.set(
                "/service/api/add/service",
                "POST",
                { title, description },
                { "Content-Type": "application/json" },
                false
            );
            setLoading(false);
            if (data.success) {
                setTitle("");
                setDescription("");
                navigate(`/admin/${ROUTE}/services`);
            } else {
                showAlert(data.message);
            }
        }
    };

    return (
        <>
            <Header />
            <div className="container mt-5" id='add_service'>
                {
                    isError
                        ? <Toast cls={"bg-danger"} message={error} />
                        : null
                }
                <div className="heading mb-3">
                    <h1 className="m-0 p-0">Add Service</h1>
                </div>
                <form onSubmit={addService} className='d-flex flex-column align-items-center mx-auto'>
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
                                    : <>Add</>
                            }
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddService;