import React, { useContext, useEffect, useState } from 'react';
import Toast from '../../components/Toast.jsx';
import Loader from '../../components/Loader.jsx';
import Header from '../../layout/Header.jsx';
import { Context } from '../../../main.jsx';
import { Crud } from '../../../classes/Crud.js';

const UpdateLogo = () => {

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

    const [darkLogo, setDarkLogo] = useState("");
    const [darkLogoPreview, setDarkLogoPreview] = useState("");
    const [lightLogo, setLightLogo] = useState("");
    const [lightLogoPreview, setLightLogoPreview] = useState("");

    useEffect(() => {
        setLoading(true);
        fetchLogo();
    }, []);

    //fetching logoes
    const fetchLogo = async () => {
        const data = await obj.get("/layout/api/get");
        setLoading(false);
        if (data.success) {
            setDarkLogoPreview(data.layout[0].darkLogo);
            setLightLogoPreview(data.layout[0].lightLogo);
            setArePostsFound(true);
        }
    };

    //reseting
    const reset = () => {
        setDarkLogo("");
        setLightLogo("");
    };

    //verifying whether the logo has been choosen for updating
    const verify = (logo) => {
        if (logo === "") {
            showAlert("No file choosen!");
            return false;
        }
        return true;
    };

    //file handling for dark logo
    const darkLogoHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setDarkLogo(file);
            setDarkLogoPreview(reader.result);
        };
    };

    //file handling for light logo
    const lightLogoHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setLightLogo(file);
            setLightLogoPreview(reader.result);
        };
    };

    //updating dark logo
    const handleSubmitDark = async (e) => {
        e.preventDefault();
        if (verify(darkLogo)) {
            const formData = new FormData();
            formData.append('darkLogo', darkLogo);
            const data = await obj.set(
                "/layout/api/update/dark/logo",
                "PUT",
                formData,
                null,
                true
            );
            if (data.success) {
                reset();
                showSuccess(data.message);
            } else {
                showAlert(data.message);
            }
        }
    };

    //updating light logo
    const handleSubmitLight = async (e) => {
        e.preventDefault();
        if (verify(lightLogo)) {
            const formData = new FormData();
            formData.append('lightLogo', lightLogo);
            const data = await obj.set(
                "/layout/api/update/light/logo",
                "PUT",
                formData,
                null,
                true
            );
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
                        <article className="rounded py-4 px-4 mt-5" id='editLogo'>
                            {
                                isError || isSuccess
                                    ? <Toast cls={isError ? "bg-danger" : "bg-success"} message={isError ? error : success} />
                                    : null
                            }
                            <div className="heading mb-3">
                                <h2 className="m-0 p-0">Update Logo</h2>
                            </div>
                            <div className="mainContainer d-flex justify-content-between mb-3 bg-light p-4 rounded">
                                <div className="imgWrapper mb-2 mx-auto">
                                    <img src={darkLogoPreview} alt="image" className='img-fluid' />
                                </div>
                                <form onSubmit={handleSubmitDark}>
                                    <div className="form-group mb-3">
                                        <label htmlFor="">Choose Picture</label>
                                        <input type="file" className="form-control" onChange={darkLogoHandler} />
                                    </div>
                                    <div className="form-group">
                                        <button type='submit' className="btn btn-sm adminBtn text-light">
                                            {
                                                loading
                                                    ? <div className="spinner-border spinner-border-sm"></div>
                                                    : <>Update Dark Logo</>
                                            }
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="mainContainer d-flex justify-content-between bg-dark p-4 rounded">
                                <div className="imgWrapper mb-2 mx-auto">
                                    <img src={lightLogoPreview} alt="image" className='img-fluid' />
                                </div>
                                <form onSubmit={handleSubmitLight}>
                                    <div className="form-group mb-3">
                                        <label htmlFor="">Choose Picture</label>
                                        <input type="file" className="form-control" onChange={lightLogoHandler} />
                                    </div>
                                    <div className="form-group">
                                        <button type='submit' className="btn btn-sm adminBtn text-light">
                                            {
                                                loading
                                                    ? <div className="spinner-border spinner-border-sm"></div>
                                                    : <>Update Light Logo</>
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

export default UpdateLogo;