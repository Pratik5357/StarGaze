import styles from './galleryPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/Context';
import Loader from "../../loader/Loader";

const GalleryPage = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true); // Add a loading state
    const { isAuth, verifyUser } = useAuth();
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/data/apod");
            setData(res.data);
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };

    useEffect(() => {
        const checkAuthAndFetch = async () => {
            await verifyUser(); // Verify user
            setLoading(false); // Set loading to false after verification
        };

        checkAuthAndFetch();
    }, []);

    useEffect(() => {
        if (!loading && !isAuth) {
            // Navigate to login only after loading completes and user is not authenticated
            navigate("/login");
        } else if (!loading) {
            fetchData(); // Fetch data only if user is authenticated
        }
    }, [loading, isAuth]);

    if (loading) return <Loader textData="Loading..." />

    if (!data) return <Loader textData="Fetching gallery data..." />

    return (
        <div className={styles.galleryPage}>
            <h1 className={styles.mainTitle}>Astronomy Picture Gallery</h1>
            <div className={styles.galleryGrid}>
                {data.map((item, index) => (
                    <div key={index} className={styles.galleryItem}>
                        <div className={styles.top}>
                            <div className={styles.imgContainer}>
                                {item.media_type === "image" ? (
                                    <img src={item.url} alt={item.title} className={styles.img} />
                                ) : (
                                    <iframe
                                        src={item.url}
                                        title={item.title}
                                        className={styles.img}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    ></iframe>
                                )}
                            </div>
                            <span className={styles.date}>{item.date}</span>
                        </div>
                        <div className={styles.bottom}>
                            <h2 className={styles.title}>{item.title}</h2>
                            <Link className={styles.btn} to={`/gallery/apod/${item.date}`} item={item}>
                                View more
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GalleryPage;