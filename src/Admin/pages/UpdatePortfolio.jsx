import React, { useContext, useEffect, useState } from 'react';
import Header from '../layout/Header.jsx';
import { Crud } from '../../classes/Crud.js';
import { useParams } from 'react-router-dom';
import Toast from '../components/Toast.jsx';
import Loader from '../components/Loader.jsx';
import { Context } from '../../main.jsx';

const UpdatePortfolio = () => {

    const { id } = useParams();

    const obj = new Crud();

    const {
        loading, setLoading,
        arePostsFound, setArePostsFound,
        error,
        success,
        isError,
        isSuccess,
        showAlert, showSuccess
    } = useContext(Context);

    const [title, setTitle] = useState("");

    useEffect(() => {
        setLoading(true);
        fetchPortfolioData();
    }, []);

    //getting portfolio data
    const fetchPortfolioData = async () => {
        const data = await obj.get(`/portfolio/api/get/${id}`, { method: "POST" });
        setLoading(false);
        if (data.success) {
            setTitle(data.portfolio.title);
            setArePostsFound(true);
            setLoading(false);
        }
    };

    //verifying whether the required data is provided ?
    const verify = () => {
        if (title === "") {
            showAlert("Portfolio title is necessary!");
            return false;
        }
        return true;
    };

    //updating the portfolio
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (verify()) {
            const obj = new Crud();
            const data = await obj.set(
                `/portfolio/api/update/${id}`,
                'PUT',
                { title },
                { "Content-Type": "application/json" },
                false
            );
            setLoading(false);
            if (data.success) {
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
                        <article className='mt-5 px-5 py-4 rounded' id='login'>
                            {
                                isError || isSuccess
                                    ? <Toast cls={isError ? "bg-danger" : "bg-success"} message={isError ? error : success} />
                                    : null
                            }
                            <div className="heading mb-4">
                                <h2>Update Portfolio</h2>
                            </div>

                            <div className="loginForm">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group mb-3">
                                        <label htmlFor="portfolio">Portfolio Title</label>
                                        <input type="text" className="form-control" id='portfolio' value={title} onChange={e => setTitle(e.target.value)} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type='submit' className='text-light rounded adminBtn'>
                                            {
                                                loading
                                                    ?
                                                    <div className="spinner-border spinner-border-sm"></div>
                                                    :
                                                    <>Update</>
                                            }
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </article>
                    </>
            }
        </>
    );
}

export default UpdatePortfolio;