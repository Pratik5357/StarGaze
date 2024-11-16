import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./footer/Footer";
import Navbar from "./navbar/Navbar";
import HomePage from "./pages/homePage/HomePage";
import GalleryPage from "./pages/galleryPage/GalleryPage";
import SingleApod from "./pages/singleApod/SingleApod";
import LoginPage from "./pages/loginPage/LoginPage";
import SignupPage from "./pages/signupPage/SignupPage";
import NewsPage from "./pages/newsPage/NewsPage";
import AboutPage from "./pages/aboutPage/AboutPage";

function App() {
  return (
    <>
      <div className="app-box h-100">
        <div className="nav w-100">
          <Navbar />
        </div>
        <main className=''>
          <Routes>
            <Route path="/" element={<HomePage /> }/>
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/gallery/apod/:date" element={<SingleApod />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <div className="foot d-flex align-items-center">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
