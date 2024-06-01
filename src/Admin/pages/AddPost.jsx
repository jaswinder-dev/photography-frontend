import React, { useContext, useEffect, useState } from 'react';
import defaultImg from '../../assets/default.png';
import Header from '../layout/Header.jsx';
import Toast from '../components/Toast.jsx';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../../config/env.js';
import { Crud } from '../../classes/Crud.js';
import { Context } from '../../main.jsx';

const AddPost = () => {

    const obj = new Crud();

    const navigate = useNavigate();

    const { error, isError, loading, setLoading, showAlert } = useContext(Context);

    const [portfolioes, setPortfolioes] = useState([]);

    const [image, setImage] = useState("");
    const [portfolio, setPortfolio] = useState("");
    const [imagePreview, setImagePreview] = useState(defaultImg);
    const [description, setDescription] = useState("");

    useEffect(() => {
        fetchPortfolioes();
    }, []);

    //fetching portfolios (posts will belong to one of these)
    const fetchPortfolioes = async () => {
        const data = await obj.get("/portfolio/api/get");
        if (data.success) {
            setPortfolioes(data.portfolioes);
        } else {
            showAlert(data.message);
        }
    };

    //resetting the fields
    const reset = () => {
        setImage("");
        setPortfolio("");
        setImagePreview(defaultImg);
        setDescription("");
    };

    //file handeling
    const imageHandeler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(file);
            setImagePreview(reader.result);
        };
    };

    // verifying whether the required data is provided ?
    const verify = () => {
        if (image === "" || portfolio === "") {
            showAlert("Both file and portfolio are necessary!");
            return false;
        }
        return true;
    };

    //adding the post
    const UploadImage = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (verify()) {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('description', description);
            formData.append('portfolio', portfolio);

            const obj = new Crud();
            const data = await obj.set("/post/api/add/post", 'POST', formData, null, true);
            setLoading(false);
            if (data.success) {
                reset();
                navigate(`/admin/${ROUTE}/posts`);
            } else {
                showAlert(data.message)
            }
        }
    };

    return (
        <>
            <Header />
            <article className="rounded py-4 px-4 mt-5" id='addImages'>
                {
                    isError
                        ? <Toast cls={"bg-danger"} message={error} />
                        : null
                }
                <div className="heading mb-3">
                    <h2 className="m-0 p-0">Add Post</h2>
                </div>
                <div className="mainContainer d-flex justify-content-between">
                    <div className="imgWrapper mb-2">
                        <img src={imagePreview} alt="IMAGE TO UPLOAD" className='img-fluid' />
                    </div>
                    <form onSubmit={UploadImage}>
                        <div className="form-group mb-3">
                            <label htmlFor="#image">Choose Picture</label>
                            <input type="file" id='image' className="form-control" onChange={imageHandeler} />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="#portfolio">Choose portfolio</label>
                            <select name="portfolio" id="portfolio" className='form-select' onChange={e => setPortfolio(e.target.value)} value={portfolio}>
                                <option value="">Select portfolio</option>
                                {
                                    portfolioes.map((portfolio, index) =>
                                        <option value={portfolio._id} key={++index}>{portfolio.title}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="#description">Give Description</label>
                            <textarea className='form-control' name="description" id="description" cols="30" rows="3" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                        </div>
                        <div className="form-group">
                            <button type='submit' className="btn btn-sm adminBtn text-light">{
                                loading
                                    ?
                                    <div className="spinner-border spinner-border-sm"></div>
                                    :
                                    <>Add</>
                            }</button>
                        </div>
                    </form>
                </div>
            </article>
        </>
    );
}

export default AddPost;