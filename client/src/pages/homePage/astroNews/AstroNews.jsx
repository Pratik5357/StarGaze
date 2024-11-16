import { useEffect, useState } from 'react';
import styles from './astroNews.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AstroNews() {
    const [news, setNews] = useState(null);


    useEffect(() => {
      axios.get('http://localhost:3000/api/data/news')
        .then(response => {
          setNews(response.data.results);
        })
        .catch(error => {
          console.error('Error fetching news:', error);
        });
    }, []);

    if(!news) return <div className={`${styles.loader} m-5 text-center`}></div>

  return (
    <section className={styles.newsFeed}>
      <h2 className={styles.title}>Latest Astronomy News</h2>
      <div className={styles.newsList}>
        {news.map((article, index) => (
          <div key={index} className={styles.newsItem}>
            <h3 className={styles.headline}>{article.title}</h3>
            <p className={styles.description}>{article.summary}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.readMoreButton}
            >
              Read More
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
