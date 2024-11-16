import { useAuth } from "../context/Context";
import styles from "./navbar.module.css";
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
    let currPath = useLocation().pathname;
    let navigate = useNavigate();
    const { isAuth, logoutUser } = useAuth();

    const logout = async () => {
        await logoutUser(); // Log out the user
        navigate("/login"); // Redirect to login page after logout
    };

    return (
        <nav className={`${styles.container} navbar w-100`}>
            <div className={`${styles.mainContent} container-fluid py-3 px-5`}>
                <div className="nav-logo">
                    <Link to="/" className={`navbar-brand text-white fs-3 ${styles.logo}`}>StarGaze</Link>
                </div>
                <div className={`${styles.nav_links}`}>
                    <Link to="/" className={`nav-links text-decoration-none text-white py-1 px-2 rounded-1 ${currPath === '/' ? `${styles.active}` : ''}`}>Home</Link>
                    <Link to="/gallery" className={`nav-links text-decoration-none text-white py-1 px-2 rounded-1 ${currPath === '/gallery' ? `${styles.active}` : ''}`}>Gallery</Link>
                    <Link to="/about" className={`nav-links text-decoration-none text-white py-1 px-2 rounded-1 ${currPath === '/about' ? `${styles.active}` : ''}`}>About</Link>
                    <Link to="/news" className={`nav-links text-decoration-none text-white py-1 px-2 rounded-1 ${currPath === '/news' ? `${styles.active}` : ''}`}>News</Link>
                    {/* <Link to="/Contact" className={`nav-links text-decoration-none text-white py-1 px-2 rounded-1 ${currPath === '/Contact' ? `${styles.active}` : ''}`}>Contact</Link> */}
                </div>
                <div className={`${styles.loginBtn} border py-2 px-3 rounded-1`}>
                    {isAuth ? (
                        <Link
                            className={`${styles.button} text-decoration-none w-100 h-100`}
                            onClick={logout}
                        >
                            Logout
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            className={`${styles.button} text-decoration-none w-100 h-100`}
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
            <div className={styles.expNav}>
                <div className={`${styles.expand_nav} d-flex justify-content-evenly align-items-center w-100 `}>
                    <Link to="/" className={`${styles.expDiv} nav-links text-decoration-none text-white py-1 px-2  ${currPath === '/' ? `${styles.exp_active}` : ''}`}>Home</Link>
                    <Link to="/gallery" className={`${styles.expDiv} nav-links text-decoration-none text-white py-1 px-2  ${currPath === '/gallery' ? `${styles.exp_active}` : ''}`}>Gallery</Link>
                    <Link to="/about" className={`${styles.expDiv} nav-links text-decoration-none text-white py-1 px-2  ${currPath === '/about' ? `${styles.exp_active}` : ''}`}>About</Link>
                    <Link to="/news" className={`${styles.expDiv} nav-links text-decoration-none text-white py-1 px-2  ${currPath === '/news' ? `${styles.exp_active}` : ''}`}>News</Link>
                    <Link to="/contact" className={`${styles.expDiv} nav-links text-decoration-none text-white py-1 px-2 ${currPath === '/contact' ? `${styles.exp_active}` : ''}`}>Contact</Link>
                </div>
            </div>
        </nav>
    );
}