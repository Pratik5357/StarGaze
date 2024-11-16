import React from 'react';
import styles from './aboutPage.module.css';

export default function AboutPage() {
  return (
    <section className={styles.aboutPage}>
      <h1 className={styles.title}>About Our APOD Website</h1>

      <div className={styles.contentSection}>
        <h2 className={styles.subtitle}>Our Mission</h2>
        <p className={styles.text}>
          Our website is dedicated to bringing the wonders of the universe closer to you. By displaying NASA's Astronomy Picture of the Day (APOD) images, we aim to inspire curiosity and wonder about the cosmos. Each image is handpicked by NASA, capturing extraordinary moments in space and showcasing scientific achievements.
        </p>
      </div>

      <div className={styles.contentSection}>
        <h2 className={styles.subtitle}>Features</h2>
        <ul className={styles.featuresList}>
          <li>🌌 <strong>Daily Astronomy Images</strong>: Discover a new picture each day, directly sourced from NASA’s APOD archive.</li>
          <li>🔍 <strong>Image Search</strong>: Search for APOD images by specific date, month, or year to find specific moments in space exploration.</li>
          <li>📰 <strong>Astronomy News Feed</strong>: Stay updated with the latest news and articles related to astronomy and space.</li>
          <li>📸 <strong>Gallery</strong>: Explore a curated gallery of popular and significant APOD images.</li>
          <li>💬 <strong>User Feedback</strong>: Read what other users are saying or leave your feedback.</li>
        </ul>
      </div>

      <div className={styles.contentSection}>
        <h2 className={styles.subtitle}>Why Explore Space?</h2>
        <p className={styles.text}>
          Space exploration expands our understanding of the universe and our place within it. It drives innovation, inspires creativity, and challenges our knowledge. By engaging with APOD images and information, we can explore the depths of the cosmos from Earth, witnessing the beauty and mystery of space.
        </p>
      </div>

      <div className={styles.callToAction}>
        <h2 className={styles.subtitle}>Ready to Explore?</h2>
        <p className={styles.text}>
          Join us on this cosmic journey! Head over to our <a href="/gallery" className={styles.link}>Gallery</a> to start exploring breathtaking images, or visit the <a href="/search" className={styles.link}>Search</a> page to find specific moments in space history.
        </p>
        <button className={styles.exploreButton} onClick={() => window.location.href = '/gallery'}>
          Start Exploring
        </button>
      </div>
    </section>
  );
}