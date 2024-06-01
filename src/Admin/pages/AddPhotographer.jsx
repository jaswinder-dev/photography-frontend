import React, { useState, useContext } from 'react';
import Toast from '../components/Toast';
import Header from '../layout/Header';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../../config/env.js';
import { Context } from '../../main';
import { Crud } from '../../classes/Crud.js';

const AddPhotographer = () => {

    const obj = new Crud();

    const navigate = useNavigate();

    const { loading, setLoading, error, isError, showAlert } = useContext(Context);

    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [role, setRole] = useState("Normal");

    //verifying whether required data is provided ?
    const verify = () => {
        if (
            fullname === "" ||
            username === "" ||
            email === "" ||
            phone === "" ||
            password === "" ||
            role === "" ||
            repassword === ""
        ) {
            showAlert("All the fields are required!");
            return false;
        }
        if (password !== repassword) {
            showAlert("Password does't match the confirmed password!");
            return false;
        }
        return true;
    };

    //resetting the fields 
    const reset = () => {
        setFullname("");
        setUsername("");
        setEmail("");
        setPhone("");
        setPassword("");
        setRepassword("");
        setRole("Normal");
    };

    //adding the photographer
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (verify()) {
            const data = await obj.set(
                "/photographer/api/add/photographer",
                "POST",
                { fullname, username, email, phone, password, role },
                { "Content-Type": "application/json" },
                false
            );
            setLoading(false);
            if (data.success) {
                reset();
                navigate(`/admin/${ROUTE}/photographers`);
            } else {
                showAlert(data.message);
            }
        }
    };

    return (
        <>
            <Header />
            <article className='mt-5 px-5 py-4'>
                {
                    isError
                        ? <Toast cls={"bg-danger"} message={error} />
                        : null
                }
                <div className="heading mb-4">
                    <h2>Add Photographer</h2>
                </div>
                <div className="loginForm">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <input type="text" className="form-control" placeholder='Full name' value={fullname} onChange={e => setFullname(e.target.value)} />
                        </div>
                        <div className="form-group mb-3">
                            <input type="text" className="form-control" placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
                        </div>
                        <div className="form-group mb-3">
                            <input type="email" className="form-control" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group mb-3">
                            <input type="tel" className="form-control" placeholder='Phone' value={phone} onChange={e => setPhone(e.target.value)} />
                        </div>
                        <div className="form-group mb-3">
                            <input type="password" className="form-control" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className="form-group mb-3">
                            <input type="password" className="form-control" placeholder='Confirm password' value={repassword} onChange={e => setRepassword(e.target.value)} />
                        </div>
                        <div className="form-group mb-3">
                            <select name="role" id="role" className="form-select" value={role} onChange={e => setRole(e.target.value)}>
                                <option value="">Select authorization</option>
                                <option value="Admin">Admin</option>
                                <option value="Normal">Normal</option>
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <button type='submit' className='text-light rounded adminBtn'>{
                                loading
                                    ? <div className="spinner-border spinner-border-sm"></div>
                                    : <>Add</>
                            }</button>
                        </div>
                    </form>
                </div>
            </article>
        </>
    );
}

export default AddPhotographer;