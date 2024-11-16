import { Link, useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import { useState } from 'react';
import axios from 'axios';

export default function LoginPage() {
    const [ data ,setData ] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        
        let response = await axios.post("http://localhost:3000/api/user/login",{
            username: data.username,
            password: data.password
        });
        console.log('Response Status:', response.status); 
        if (response.status === 200) {
            navigate('/');
        }
        
    }

    const handleChange = (e)=>{
        setData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    return (
        <div className={`container-fluid d-flex h-100 justify-content-center align-items-center`}>
            <div className={styles.loginContainer}>
                <h1 className='text-white text-center'>Sign In</h1>
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
                            <label htmlFor='password'>Password</label>
                            <div className={styles.input}>
                                <i className="fa-solid fa-lock"></i>
                                <input type="password" name='password' placeholder='Enter your password' onChange={handleChange} required />
                            </div>
                        </div>
                    </div>
                    <div className={styles.btns}>
                        <button type='submit' className={styles.btn}>Login</button>
                        <p className='text-center m-0'>Don't remember password? <Link to="/forgot-password" className={styles.link}>Forgot password !</Link></p>
                        <p className='text-center m-0'>Don't have an account?<Link to="/signup" className={styles.link}> Register here !</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}
