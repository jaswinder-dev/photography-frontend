import React, { useContext, useEffect, useState } from 'react';
import Toast from '../../components/Toast.jsx';
import Loader from '../../components/Loader.jsx';
import Header from '../../layout/Header.jsx';
import { Context } from '../../../main.jsx';
import { Crud } from '../../../classes/Crud.js';

const UpdateBanner = () => {

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

    const [banner, setBanner] = useState("");
    const [bannerPreview, setBannerPreview] = useState("");

    useEffect(() => {
        setLoading(true);
        fetchBanner();
    }, []);

    //fetching banner
    const fetchBanner = async () => {
        const data = await obj.get("/layout/api/get");
        setLoading(false);
        if (data.success) {
            setBannerPreview(data.layout[0].banner);
            setArePostsFound(true);
        }
    };

    //verifying whether the banner has been choosen for updating
    const verify = () => {
        if (banner === "") {
            showAlert("No file choosen!");
            return false;
        }
        return true;
    };

    //file handling
    const fileHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setBanner(file);
            setBannerPreview(reader.result);
        };
    };

    //updating banner
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (verify()) {
            const formData = new FormData();
            formData.append('banner', banner);
            const data = await obj.set(
                "/layout/api/update/banner",
                "PUT",
                formData,
                null,
                true
            );
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
                        <article className="rounded py-4 px-4 mt-5" id='addImages'>
                            {
                                isError || isSuccess
                                    ? <Toast cls={isError ? "bg-danger" : "bg-success"} message={isError ? error : success} />
                                    : null
                            }
                            <div className="heading mb-3">
                                <h2 className="m-0 p-0">Update Banner</h2>
                            </div>
                            <div className="mainContainer d-flex justify-content-between mb-3 bg-light p-4 rounded">
                                <div className="imgWrapper mb-2">
                                    <img src={bannerPreview} alt="banner" className='img-fluid' />
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group mb-3">
                                        <label htmlFor="">Choose Picture</label>
                                        <input type="file" className="form-control" onChange={fileHandler} />
                                    </div>
                                    <div className="form-group">
                                        <button type='submit' className="btn btn-sm adminBtn text-light">Update</button>
                                    </div>
                                </form>
                            </div>
                        </article>
                    </>
            }
        </>
    );
}

export default UpdateBanner;