import styles from "./footer.module.css";

export default function Footer() {
    return (
        <div className={`${styles.container} container-fluid w-100 py-2 px-4 mx-4 d-flex align-items-center justify-content-between `} >
            <div className={`${styles.foot_title} d-flex align-items-center`}>
                {/* StarGaze &copy; all copyrights reserved 2024 */}
                &copy; 2024 StarGaze | Created by Pratik
            </div>
            <div className="d-flex align-items-center gap-3">
                <a href="https://github.com/Pratik5357"><i className="fa-brands fa-github fs-5 text-white"></i></a>
                <a href="#"><i className="fa-brands fa-facebook fs-5 text-white"></i></a>
                <a href="https://www.linkedin.com/in/pratik-kumbhar-08b216246/"><i className="fa-brands fa-linkedin fs-5 text-white"></i></a>
            </div>
        </div>
    );
}
