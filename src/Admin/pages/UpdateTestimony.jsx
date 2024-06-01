import React, { useContext, useEffect, useState } from 'react';
import Header from '../layout/Header';
import { useParams } from 'react-router-dom';
import Toast from '../components/Toast';
import { Context } from '../../main';
import { Crud } from '../../classes/Crud';
import Loader from '../components/Loader';

const UpdateTestimony = () => {

    const { id } = useParams();

    const obj = new Crud();

    const {
        loading, setLoading,
        error,
        success,
        isSuccess,
        isError,
        arePostsFound, setArePostsFound,
        showAlert, showSuccess
    } = useContext(Context);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [testimony, setTestimony] = useState("");

    useEffect(() => {
        setLoading(true);
        fetchTestimony();
    }, []);

    //getting the testimony data
    const fetchTestimony = async () => {
        const data = await obj.get(`/testimony/api/get/single/${id}`, { method: 'POST' });
        setLoading(false);
        if (data.success) {
            setName(data.testimony.name);
            setEmail(data.testimony.email);
            setPhone(data.testimony.phone);
            setTestimony(data.testimony.testimony);
            setArePostsFound(true);
        } else {
            showAlert(data.message);
        }
    };

    //resetting the fields
    const reset = () => {
        setName("");
        setEmail("");
        setPhone("");
        setTestimony("");
    };

    //verifying whether the required data is provided ?
    const verify = () => {
        if (name === "" || email === "" || testimony === "") {
            showAlert("Name, email and testimony are necessary!");
            return false;
        }
        return true;
    };

    //updating the testimony
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (verify()) {
            const data = await obj.set(
                `/testimony/api/update/${id}`,
                "PUT",
                { name, email, phone, testimony },
                { "Content-Type": "application/json" },
                false
            );
            setLoading(false);
            if (data.success) {
                reset();
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
                        <div id='add_testimonial'>
                            <div className="container mt-5">
                                {
                                    isError || isSuccess
                                        ? <Toast cls={isError ? "bg-danger" : "bg-success"} message={isError ? error : success} />
                                        : null
                                }
                                <div className="heading mb-3">
                                    <h1 className="m-0 p-0">Update Testimony</h1>
                                </div>
                                <form onSubmit={handleSubmit} className='w-100 d-flex flex-column align-items-center'>
                                    <div className="w-100 form-group mb-3">
                                        <input type="text" className="form-control" placeholder='Name(s)' value={name} onChange={e => setName(e.target.value)} />
                                    </div>
                                    <div className="w-100 form-group mb-3">
                                        <input type="email" className="form-control" placeholder='email' value={email} onChange={e => setEmail(e.target.value)} />
                                    </div>
                                    <div className="w-100 form-group mb-3">
                                        <input type="tel" className="form-control" placeholder='phone' value={phone} onChange={e => setPhone(e.target.value)} />
                                    </div>
                                    <div className="w-100 form-group mb-3">
                                        <textarea name="" id="" className='w-100 p-3' value={testimony} onChange={e => setTestimony(e.target.value)}>
                                            Give testimony...
                                        </textarea>
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
                        </div>
                    </>
            }
        </>
    );
}

export default UpdateTestimony;