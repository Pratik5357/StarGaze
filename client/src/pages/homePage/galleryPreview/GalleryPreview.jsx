import styles from './GalleryPreview.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function GalleryPreview() {
    const [ data, setData ] = useState();

    useEffect(
        () => {
            axios.get("http://localhost:3000/api/data/apod").then(
                response => {
                    setData(response.data.slice(0,4));
                }
            )
        }, []);

    if(!data) return <div className={styles.loader}>Loading....</div>

  return (
    <div className={`${styles.container} container-fluid m-0 px-3 py-2 mb-3 d-flex flex-column`}>
        <h1 className='text-center'>Gallery Preview</h1>
        <div className={`${styles.galleryGrid}`}>
            {data.map((item, index) =>(
                <div key={index} className={`${styles.gCard} card m-2 overflow-hidden`} >
                    { item.media_type == "image" ? <img className='image-card-top' src={item.url} alt={item.title} /> : <iframe
                    src={item.url}
                    title={item.title}
                    className='image-card-top'
                    height="80%"
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>}
                    <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text text-light-emphasis">{new Date(item.date).toLocaleDateString()}</p>
                    </div>
                </div>
            ))}
        </div>
        <div className='d-flex justify-content-center my-3'>
            <Link to="/gallery" className={`${styles.btn} btn w-50`}>View Gallery</Link>
        </div>
    </div>
  )
}
