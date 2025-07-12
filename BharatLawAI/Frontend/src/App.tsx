import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SectionExplorerPage from './pages/SectionExplorerPage';
import AboutPage from './pages/AboutPage';
import LandingPage from './pages/LandingPage';
import LegalLibraryPage from './pages/LegalLibraryPage';
import Loader from './components/Loader'; // Import the Loader component

function App() {
  const [loading, setLoading] = useState(true);

  const handleLoaded = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && <Loader onLoaded={handleLoaded} />}
      {!loading && (
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/chat" element={<HomePage />} />
            <Route path="/explorer" element={<SectionExplorerPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/library" element={<LegalLibraryPage />} />
          </Routes>
        </Layout>
      )}
    </>
  );
}

export default App;
