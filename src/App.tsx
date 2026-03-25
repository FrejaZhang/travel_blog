import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import DiaryListPage from './pages/DiaryListPage';
import DiaryDetailPage from './pages/DiaryDetailPage';
import GuidePage from './pages/GuidePage';
import GuideDetailPage from './pages/GuideDetailPage';
import MapPage from './pages/MapPage';
import AboutPage from './pages/AboutPage';
import GuestbookPage from './pages/GuestbookPage';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/diary" element={<DiaryListPage />} />
        <Route path="/diary/:slug" element={<DiaryDetailPage />} />
        <Route path="/guide" element={<GuidePage />} />
        <Route path="/guide/:slug" element={<GuideDetailPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/guestbook" element={<GuestbookPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
