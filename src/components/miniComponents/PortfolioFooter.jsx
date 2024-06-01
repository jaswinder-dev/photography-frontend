import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter, FaPhoneAlt, FaLinkedinIn } from "react-icons/fa";
import { Crud } from '../../classes/Crud.js';
import { MdEmail } from "react-icons/md";
import { RiPinterestLine } from "react-icons/ri";

const PortfolioFooter = () => {

    const [logo, setLogo] = useState("");
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [youtube, setYoutube] = useState("");
    const [twitter, setTwitter] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [pinterest, setPinterest] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    //fetching social's data
    const fetchData = async () => {
        const obj = new Crud();
        const logoData = await obj.get("/layout/api/get");
        if (logoData.success) {
            setLogo(logoData.layout[0].lightLogo);
        }
        const socialData = await obj.get("/social/api/get");
        if (socialData.success) {
            const socials = socialData.socials[0];
            setFacebook(socials.facebook);
            setInstagram(socials.instagram);
            setYoutube(socials.youtube);
            setTwitter(socials.twitter);
            setLinkedin(socials.linkedin);
            setPinterest(socials.pinterest);
            setContact(socials.contact);
            setEmail(socials.email);
        }
    };

    return (
        <footer className="py-4 d-flex justify-content-around align-items-center flex-wrap">
            <div className="socials p-3 d-flex flex-column justify-content-between align-items-center">
                <div className="socialsLogo">
                    <img src={logo} className='img-fluid' alt="LOGO" />
                </div>
                <div className="socialLinks">
                    <nav>
                        <ul className='list-unstyled d-flex justify-content-around align-items-center'>
                            <li className='p-2'><Link to={facebook}><FaFacebookF /></Link></li>
                            <li className='p-2'><Link to={instagram}><FaInstagram /></Link></li>
                            <li className='p-2'><Link to={youtube}><FaYoutube /></Link></li>
                            <li className='p-2'><Link to={twitter}><FaTwitter /></Link></li>
                            <li className='p-2'><Link to={pinterest}><RiPinterestLine /></Link></li>
                            <li className='p-2'><Link to={linkedin}><FaLinkedinIn /></Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="contacts p-3">
                <div className="heading mb-3">
                    <h3 className="text-center m-0 p-0 text-light">GET IN TOUCH</h3>
                </div>
                <p className="m-0 py-1 text-center"><b><FaPhoneAlt /></b> {contact}</p>
                <p className="m-0 py-1 text-center"><b><MdEmail /></b><Link className='mx-1' to={"/"}>{email}</Link></p>
            </div>
        </footer>
    );
}

export default PortfolioFooter;