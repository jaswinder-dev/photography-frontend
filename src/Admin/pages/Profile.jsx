import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MdEditSquare, MdDeleteOutline } from "react-icons/md";
import { Crud } from '../../classes/Crud.js';
import Header from '../layout/Header';
import Toast from '../components/Toast';
import Loader from '../components/Loader.jsx';
import { Context } from '../../main.jsx';
import { ROUTE } from '../../../config/env.js';

const Profile = () => {

    const { id } = useParams();

    const obj = new Crud();

    const [photographer, setPhotographer] = useState({});

    const {
        loading, setLoading,
        arePostsFound, setArePostsFound,
        error,
        success,
        isError,
        isSuccess,
        showAlert, showSuccess
    } = useContext(Context);

    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("");

    const [isAvatarSelected, setIsAvatarSelected] = useState(false);
    const [cmndToRemoveAvatar, setCmndToRemoveAvatar] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchProfile();
    }, []);

    //fetching photographer data
    const fetchProfile = async () => {
        const data = await obj.get(`/photographer/api/profile`);
        setLoading(false);
        if (data.success) {
            setPhotographer(data.photographer);
            setAvatarPreview(data.photographer.avatar);
            setArePostsFound(true);
        } else {
            showAlert(data.message);
        }
    };

    //avatar handeling
    const avatarHandeler = (e) => {
        setCmndToRemoveAvatar(false);
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setAvatar(file);
            setAvatarPreview(reader.result);
            setIsAvatarSelected(true);
        };
    };

    //updating the avatar
    const editAvatar = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (avatar === "") {
            showAlert("Please choose an avatar!");
        } else {
            const formData = new FormData();
            formData.append('avatar', avatar);
            const data = await obj.set(
                `/photographer/api/update/avatar/${id}`,
                "PUT",
                formData,
                null,
                true
            );
            setLoading(false);
            if (data.success) {
                setAvatar("");
                setIsAvatarSelected(false);
                showSuccess(data.message + " Please Login again. ");
            } else {
                showAlert(data.message);
            }
        }
    };

    //command to remove the avatar
    const removeAvatarCMD = () => {
        setCmndToRemoveAvatar(true);
        setAvatar("");
        setIsAvatarSelected(false);
    };

    //removing the avatar
    const removeAvatar = async () => {
        setLoading(true);
        const data = await obj.delete(`/photographer/api/delete/avatar/${id}`);
        setLoading(false);
        if (data.success) {
            setAvatarPreview("");
            setCmndToRemoveAvatar(false);
            showSuccess(data.message + " Please Login again. ");
        } else {
            showAlert(data.message);
        }
    };

    return (
        <>
            {
                loading && !arePostsFound
                    ? <Loader />
                    : <>
                        <Header />
                        <article className='p-4 mt-5' id='profile'>
                            <div className="heading d-flex justify-content-between align-items-center mb-3">
                                <h3 className='m-0 p-0'>@{photographer.username}</h3>
                                <Link to={`/admin/${ROUTE}/myimages/${photographer._id}`} className='adminBtn_sm text-light rounded'>My Posts</Link>
                            </div>
                            {
                                (isError || isSuccess)
                                    ?
                                    <Toast cls={isError ? "bg-danger" : "bg-success"} message={isError ? error : success} />
                                    :
                                    null
                            }
                            <div className="profilePicture d-flex justify-content-center align-items-center">
                                <div className="profilePicWrapper position-relative">
                                    <img src={avatarPreview} alt="" className="img-fluid" />
                                    <button type='button' className="btn btn-danger btn-sm position-absolute" title='Remove Profile picture' onClick={removeAvatarCMD}><MdDeleteOutline /></button>
                                    <label className='btn btn-primary btn-sm position-absolute' htmlFor="avatar" title='Edit Profile picture'><MdEditSquare /></label>
                                </div>
                                <form id='ADD_AVATAR' onSubmit={editAvatar}>
                                    <input type="file" className="d-none" id='avatar' onChange={avatarHandeler} />
                                </form>
                            </div>
                            <div className="text-center mt-3">
                                {
                                    isAvatarSelected
                                        ? <button type='submit' form='ADD_AVATAR' className="btn btn-sm text-light adminBtn bg-success">
                                            {
                                                loading
                                                    ?
                                                    <div className="spinner-border spinner-border-sm"></div>
                                                    : <>Update Profile picture</>
                                            }
                                        </button>
                                        : null
                                }
                                {
                                    cmndToRemoveAvatar
                                        ? <button type='button' className="btn btn-sm text-light adminBtn bg-danger" onClick={removeAvatar}>
                                            {
                                                loading
                                                    ?
                                                    <div className="spinner-border spinner-border-sm"></div>
                                                    : <>Remove Profile picture</>
                                            }
                                        </button>
                                        : null
                                }
                            </div>
                            <div className="text-center mt-3">
                                <p className='m-0 p-0'><b>{photographer.fullname}</b></p>
                            </div>
                            <div className="text-center">
                                <p className='m-0 p-0'><b>{photographer.posts}</b> Posts</p>
                            </div>
                            <div className="text-center">
                                <p className='m-0 p-0'>{photographer.email}</p>
                            </div>
                        </article>
                    </>
            }
        </>
    );
}

export default Profile;