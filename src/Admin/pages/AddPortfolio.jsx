import React, { useContext, useState } from 'react'
import Header from '../layout/Header';
import { Crud } from '../../classes/Crud';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';
import { ROUTE } from '../../../config/env.js';
import { Context } from '../../main';
import defaultImg from '../../assets/default.png';

const AddPortfolio = () => {

    const navigate = useNavigate();
    const { loading, setLoading, error, isError, showAlert } = useContext(Context);

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState(defaultImg);

    //file handling 
    const fileHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(file);
            setImagePreview(reader.result);
        };
    };

    //resetting the fields
    const reset = () => {
        setTitle("");
        setImage("");
        setImagePreview(defaultImg);
    };

    //verifying whether the required data is provided ?
    const verify = () => {
        if (title === "" || image === "") {
            showAlert("All fields are necessary!");
            return false;
        }
        return true;
    };

    //adding the portfolio
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (verify()) {
            const obj = new Crud();
            const formData = new FormData();
            formData.append("title", title);
            formData.append("image", image);
            const data = await obj.set(
                "/portfolio/api/add/portfolio",
                'POST',
                formData,
                null,
                true
            );
            setLoading(false);
            if (data.success) {
                reset();
                navigate(`/admin/${ROUTE}/portfolioes`);
            } else {
                showAlert(data.message);
            }
        }
    };

    return (
        <>
            <Header />
            <article className='mt-5 px-5 py-4 rounded' id='login'>
                {
                    isError
                        ?
                        <Toast cls={"bg-danger"} message={error} />
                        : null
                }
                <div className="heading mb-4">
                    <h2>Add Portfolio</h2>
                </div>

                <div className="loginForm">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="portfolio">Portfolio Title</label>
                            <input type="text" className="form-control" id='portfolio' value={title} onChange={e => setTitle(e.target.value)} />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="image" className='mb-2'>Choose Image</label>
                            <div className="imageWrapper w-100 mb-3">
                                <img src={imagePreview} alt="portfolio image" className='img-fluid' />
                            </div>
                            <input type="file" className='form-control' id='image' onChange={fileHandler} />
                        </div>
                        <div className="form-group mb-3">
                            <button type='submit' className='text-light rounded adminBtn'>
                                {
                                    loading
                                        ?
                                        <div className="spinner-border spinner-border-sm"></div>
                                        :
                                        <>Add</>
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </article>
        </>
    );
}

export default AddPortfolio;