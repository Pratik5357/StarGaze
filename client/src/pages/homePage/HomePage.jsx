
import styles from './homePage.module.css';
import Hero from './hero/Hero';
import FeaturedApod from './featuredApod/FeaturedApod';
import GalleryPreview from './galleryPreview/GalleryPreview';
import AstroNews from './astroNews/AstroNews';

export default function HomePage() {
    return (
        <>
            <Hero />
            <FeaturedApod />
            <GalleryPreview />
            <AstroNews />
        </>
    )
}
