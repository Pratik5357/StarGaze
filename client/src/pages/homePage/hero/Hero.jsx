import styles from './hero.module.css';
import { Link } from 'react-router-dom';

export default function Hero() {
    return (
        <div className={`${styles.hero_sec} container-fluid w-100 d-flex align-items-center `}>
            <div className={`${styles.hero_body} container h-75 w-100 rounded-5`}>
                <h1 className={`${styles.hero_title} text-center`}>Welcome to NASA's Astronomy Picture of the Day</h1>
                <p className={`${styles.hero_Subtitle} text-center`}>Explore the wonders of the universe, one picture at a time.</p>
                <div className={`${styles.hero_buttons}`} >
                    <Link to="/gallery" className={`${styles.btn}`}>Explore Gallery</Link>
                    <Link to="/about" className={`${styles.btn}`}>Learn More</Link>
                </div>
            </div>
        </div>
    )
}
