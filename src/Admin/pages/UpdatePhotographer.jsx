import React, { useContext, useEffect, useState } from 'react';
import Header from '../layout/Header.jsx';
import Loader from '../components/Loader.jsx';
import Toast from '../components/Toast.jsx';
import { useParams } from 'react-router-dom';
import { Crud } from '../../classes/Crud.js';
import { Context } from '../../main.jsx';

const UpdatePhotographer = () => {

    const { id } = useParams();

    const obj = new Crud();

    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("Normal");

    const {
        loading, setLoading,
        error,
        isError,
        success,
        isSuccess,
        arePostsFound, setArePostsFound,
        showAlert, showSuccess
    } = useContext(Context);

    useEffect(() => {
        setLoading(true);
        fetchPhotographer();
    }, []);

    //fetching photographer data
    const fetchPhotographer = async () => {
        const data = await obj.get(`/photographer/api/single/${id}`, { method: "POST" });
        setLoading(false);
        if (data.success) {
            setArePostsFound(true);
            setFullname(data.photographer.fullname);
            setUsername(data.photographer.username);
            setEmail(data.photographer.email);
            setPhone(data.photographer.phone);
            setRole(data.photographer.role);
        } else {
            showAlert(data.message);
        }
    };

    //resetting the fields
    const reset = () => {
        setFullname("");
        setUsername("");
        setEmail("");
        setPhone("");
        setRole("Normal");
    };

    //checking before submitting
    const vefiry = () => {
        if (fullname === "" || username === "" || email === "" || phone === "" || role === "") {
            showAlert("All the fields are required!");
            return false;
        }
        return true;
    };

    //updating photographer
    const updatePhotographer = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (vefiry()) {
            const data = await obj.set(`/photographer/api/update/${id}`,
                'PUT',
                { fullname, username, phone, email, role },
                { "Content-Type": "application/json" },
                false
            );
            setLoading(false);
            if (data.success) {
                showSuccess(data.message);
                reset();
            } else {
                showAlert(data.message);
            }
        }
    };

    return (
        <>
            {
                loading && !arePostsFound
                    ?
                    <Loader />
                    :
                    <>
                        <Header />
                        <article className='mt-5 px-5 py-4'>
                            {
                                (isError || isSuccess)
                                    ? <Toast cls={isError ? "bg-danger" : "bg-success"} message={isError ? error : success} />
                                    : null
                            }
                            <div className="heading mb-4">
                                <h2>Update Photographer</h2>
                            </div>
                            <div className="loginForm">
                                <form onSubmit={updatePhotographer}>
                                    <div className="form-group mb-3">
                                        <input type="text" className="form-control" placeholder='Full name' value={fullname} onChange={e => setFullname(e.target.value)} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <input type="text" className="form-control" placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <input type="email" className="form-control" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <input type="tel" className="form-control" placeholder='Phone' value={phone} onChange={e => setPhone(e.target.value)} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <select name="role" id="role" className="form-select" value={role} onChange={e => setRole(e.target.value)}>
                                            <option value="">Select authorization</option>
                                            <option value="Admin">Admin</option>
                                            <option value="Normal">Normal</option>
                                        </select>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type='submit' className='text-light rounded adminBtn'>{
                                            loading
                                                ? <div className="spinner-border spinner-border-sm"></div>
                                                : <>Update</>
                                        }</button>
                                    </div>
                                </form>
                            </div>
                        </article>
                    </>
            }
        </>
    );
}

export default UpdatePhotographer;