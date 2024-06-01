import React, { useContext, useEffect, useState } from 'react';
import Header from '../../layout/Header';
import Toast from '../../components/Toast';
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter, FaPhoneAlt, FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiPinterestLine } from "react-icons/ri";
import Loader from '../../components/Loader';
import { Context } from '../../../main';
import { Crud } from '../../../classes/Crud';

const UpdateSocials = () => {

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

    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [youtube, setYoutube] = useState("");
    const [twitter, setTwitter] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [pinterest, setPinterest] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        setLoading(true);
        fetchSocialDetails();
    }, []);

    //fetching social's data
    const fetchSocialDetails = async () => {
        const data = await obj.get("/social/api/get");
        setLoading(false);
        if (data.success) {
            setArePostsFound(true);
            const socials = data.socials[0];
            setFacebook(socials.facebook);
            setInstagram(socials.instagram);
            setYoutube(socials.youtube);
            setTwitter(socials.twitter);
            setLinkedin(socials.linkedin);
            setPinterest(socials.pinterest);
            setContact(socials.contact);
            setEmail(socials.email);
        } else {
            showAlert(data.message);
        }
    };

    //resetting social's data
    const reset = () => {
        setFacebook("");
        setInstagram("");
        setYoutube("");
        setTwitter("");
        setLinkedin("");
        setPinterest("");
        setContact("");
        setEmail("");
    };

    //updating social's data
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = await obj.set(
            "/social/api/update",
            "PUT",
            { facebook, instagram, youtube, twitter, linkedin, pinterest, contact, email },
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
    };

    return (
        <>
            {
                loading && !arePostsFound
                    ? <Loader />
                    :
                    <>
                        <Header />
                        <article className='mt-5 px-5 py-4 w-100' id='updateSocials'>
                            {
                                isError || isSuccess
                                    ? <Toast cls={isError ? "bg-danger" : "bg-success"} message={isError ? error : success} />
                                    : null
                            }
                            <div className="heading mb-4">
                                <h2>Update Social Links</h2>
                            </div>
                            <div className="loginForm">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group mb-3 d-flex align-items-center rounded">
                                        <span><FaFacebookF /></span>
                                        <input type="text" className="form-control" placeholder='Facebook Link' value={facebook} onChange={e => setFacebook(e.target.value)} />
                                    </div>
                                    <div className="form-group mb-3 d-flex align-items-center rounded">
                                        <span><FaInstagram /></span>
                                        <input type="text" className="form-control" placeholder='Instagram Link' value={instagram} onChange={e => setInstagram(e.target.value)} />
                                    </div>
                                    <div className="form-group mb-3 d-flex align-items-center rounded">
                                        <span><FaYoutube /></span>
                                        <input type="text" className="form-control" placeholder='Youtube Link' value={youtube} onChange={e => setYoutube(e.target.value)} />
                                    </div>
                                    <div className="form-group mb-3 d-flex align-items-center rounded">
                                        <span><FaTwitter /></span>
                                        <input type="text" className="form-control" placeholder='Twitter Link' value={twitter} onChange={e => setTwitter(e.target.value)} />
                                    </div>
                                    <div className="form-group mb-3 d-flex align-items-center rounded">
                                        <span><FaLinkedinIn /></span>
                                        <input type="text" className="form-control" placeholder='Linked-In Link' value={linkedin} onChange={e => setLinkedin(e.target.value)} />
                                    </div>
                                    <div className="form-group mb-3 d-flex align-items-center rounded">
                                        <span><RiPinterestLine /></span>
                                        <input type="text" className="form-control" placeholder='Pinterest Link' value={pinterest} onChange={e => setPinterest(e.target.value)} />
                                    </div>
                                    <div className="form-group mb-3 d-flex align-items-center rounded">
                                        <span><FaPhoneAlt /></span>
                                        <input type="tel" className="form-control" placeholder='+91 8847607834' value={contact} onChange={e => setContact(e.target.value)} />
                                    </div>
                                    <div className="form-group mb-3 d-flex align-items-center rounded">
                                        <span><MdEmail /></span>
                                        <input type="email" className="form-control" placeholder='example@gmail.com' value={email} onChange={e => setEmail(e.target.value)} />
                                    </div>
                                    <div className="form-group mb-3 d-flex align-items-center">
                                        <button type='submit' className='text-light rounded adminBtn'>
                                            {
                                                loading
                                                    ? <div className="spinner-border spinner-border-sm"></div>
                                                    : <>Update</>
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

export default UpdateSocials;