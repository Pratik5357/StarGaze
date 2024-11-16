import styles from './featuredApod.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function FeaturedApod() {
  const [apod, setApod] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/data/todaysApod`)
      .then(response => setApod(response.data))
      .catch(error => console.error("Error fetching APOD data:", error));
  }, []);

  if (!apod) return <div className={`${styles.loader} m-5 text-center`}>

  </div>;

  return (
    <section className={styles.featuredApod}>
      {console.log(apod)}
      <div className={styles.apodContent}>
        <img src={apod.url} alt={apod.title} className={styles.apodImage} />
        <div className={styles.apodText}>
          <h2>{apod.title}</h2>
          <p className={styles.apodDate}>{new Date(apod.date).toLocaleDateString()}</p>
          <p className={styles.apodDescription}>{apod.explanation}</p>
          <a href={`/gallery/apod/${apod.date}`} className={styles.btn}>View Details</a>
        </div>
      </div>
    </section>
  )
}
