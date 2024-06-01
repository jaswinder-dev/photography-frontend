import React, { useContext, useState } from 'react';
import defaultImg from "../../assets/defaultPerson.png";
import Header from '../layout/Header';
import { FaImage } from "react-icons/fa";
import Toast from '../components/Toast';
import { ROUTE } from '../../../config/env.js';
import { Context } from '../../main';
import { Crud } from '../../classes/Crud';
import { useNavigate } from 'react-router-dom';

const AddTestimony = () => {

    const navigate = useNavigate();

    const { loading, setLoading, error, isError, showAlert } = useContext(Context);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [testimony, setTestimony] = useState("");
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState(defaultImg);

    //file handling
    const fileHandeler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImagePreview(reader.result);
            setImage(file);
        };
    };

    //resetting the fields
    const reset = () => {
        setName("");
        setEmail("");
        setPhone("");
        setTestimony("");
        setImage("");
        setImagePreview(defaultImg);
    };

    // verifying whether the required data is provided ?
    const verify = () => {
        if (name === "" || email === "" || testimony === "") {
            showAlert("All fields are necessary!");
            return false;
        }
        if (image === "") {
            showAlert("No image is choosen!");
            return false;
        }
        return true;
    };

    //adding the testimony
    const handelSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('testimony', testimony);
        formData.append('image', image);
        if (verify()) {
            const obj = new Crud();
            const data = await obj.set(
                "/testimony/api/add/testimony",
                "POST",
                formData,
                null,
                true
            );
            setLoading(false);
            if (data.success) {
                reset();
                navigate(`/admin/${ROUTE}/testimonies`);
            } else {
                showAlert(data.message);
            }
        }
    };

    return (
        <>
            <Header />
            <div className="container mt-5" id='add_testimonial'>
                {
                    isError
                        ? <Toast cls={"bg-danger"} message={error} />
                        : null
                }
                <div className="heading mb-3">
                    <h1 className="m-0 p-0">Add Testimony</h1>
                </div>
                <form onSubmit={handelSubmit} className='w-100 d-flex flex-column align-items-center py-4'>
                    <div className="img_wrapper position-relative">
                        <img src={imagePreview} alt="testimonial image" className='img-fluid' />
                        <label htmlFor="image" className='position-absolute adminBtn text-light'><FaImage /></label>
                    </div>
                    <div className="w-100 form-group mb-3">
                        <input type="file" className="form-control d-none" id='image' onChange={fileHandeler} />
                    </div>
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
                                    : <>Add</>
                            }
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddTestimony;