import { Link, useNavigate } from 'react-router-dom';
import styles from './signup.module.css';
import { useState } from 'react';
import axios  from "axios";

export default function SignupPage() {
    const [ data ,setData ] = useState({
        username: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        let response = await axios.post("http://localhost:3000/api/user/signup",{
            username: data.username,
            email: data.email,
            password: data.password
        }).then(()=>navigate("/login")).catch(err => {
            console.log(err);
        });
    }

    const handleChange = (e)=>{
        setData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }
    
    return (
        <div className={`container-fluid d-flex h-100 justify-content-center align-items-center`}>
            <div className={styles.loginContainer}>
                <h1 className='text-white text-center'>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.input_boxes}>
                        <div className={`${styles.inputBox}`}>
                            <label htmlFor='username'>Username</label>
                            <div className={styles.input}>
                                <i className="fa-solid fa-user"></i>
                                <input type="text" name='username' placeholder='Enter your username' onChange={handleChange} required />
                            </div>
                        </div>
                        <div className={`${styles.inputBox}`}>
                            <label htmlFor='email'>Email</label>
                            <div className={styles.input}>
                                <i className="fa-solid fa-envelope"></i>
                                <input type="text" name='email' placeholder='Enter your email' onChange={handleChange} required />
                            </div>
                        </div>
                        <div className={`${styles.inputBox}`}>
                            <label htmlFor='password'>Password</label>
                            <div className={styles.input}>
                                <i className="fa-solid fa-lock"></i>
                                <input type="password" name='password' placeholder='Enter your password' onChange={handleChange} required />
                            </div>
                        </div>
                    </div>
                    <div className={styles.btns}>
                        <button type='submit' className={styles.btn}>Sign up</button>
                        <p className='text-center m-0'>Already have an account?<Link to="/login" className={styles.link}> Login here</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}
