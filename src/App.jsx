import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScienceFormulaDecoder from './components/ScienceFormulaDecoder';
import AboutTeacher from './components/AboutTeacher';
import Testimonials from './components/Testimonials';
import LocationContact from './components/LocationContact';
import Footer from './components/Footer';
import MeetTeacherScreen from './components/MeetTeacherScreen';
import BatchesScreen from './components/BatchesScreen';
import BookDemoScreen from './components/BookDemoScreen';
import AskToSirScreen from './components/AskToSirScreen';
import StudyMaterialsScreen from './components/StudyMaterialsScreen';
import ResultScreen from './components/ResultScreen';
import AdminPanel from './components/AdminPanel';

function checkAdminRoute() {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const search = window.location.search.toLowerCase();
  return (
    path.endsWith('/admin') ||
    path.endsWith('/admin/') ||
    hash === '#/admin' ||
    hash === '#admin' ||
    search === '?admin' ||
    search.startsWith('?admin=') ||
    search.includes('&admin')
  );
}

export default function App() {
  const [isAdmin, setIsAdmin] = useState(checkAdminRoute);
  const [activeScreen, setActiveScreen] = useState('home'); // 'home' | 'book-demo' | 'meet-teacher' | 'batches' | 'ask-to-sir' | 'study-materials' | 'results'
  const [selectedBatch, setSelectedBatch] = useState('Class 10th Science Board Special');

  useEffect(() => {
    const onLocationChange = () => {
      setIsAdmin(checkAdminRoute());
    };
    window.addEventListener('popstate', onLocationChange);
    window.addEventListener('hashchange', onLocationChange);
    return () => {
      window.removeEventListener('popstate', onLocationChange);
      window.removeEventListener('hashchange', onLocationChange);
    };
  }, []);

  const handleExitAdmin = () => {
    if (window.location.hash.toLowerCase().includes('admin')) {
      window.location.hash = '';
    } else if (window.location.search.toLowerCase().includes('admin')) {
      window.history.pushState({}, '', window.location.pathname);
    } else {
      const cleanPath = window.location.pathname.replace(/\/admin\/?$/i, '') || '/';
      window.history.pushState({}, '', cleanPath);
    }
    setIsAdmin(false);
  };

  if (isAdmin) {
    return <AdminPanel onBackToSite={handleExitAdmin} />;
  }

  const navigateTo = (screenName, batchName = null) => {
    if (batchName) {
      setSelectedBatch(batchName);
    }
    setActiveScreen(screenName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (activeScreen === 'results') {
    return (
      <ResultScreen
        onBackToHome={() => navigateTo('home')}
      />
    );
  }

  if (activeScreen === 'study-materials') {
    return (
      <StudyMaterialsScreen
        onBackToHome={() => navigateTo('home')}
        onNavigateToBookDemo={(batch) => navigateTo('book-demo', batch)}
      />
    );
  }

  if (activeScreen === 'ask-to-sir') {
    return (
      <AskToSirScreen
        onBackToHome={() => navigateTo('home')}
      />
    );
  }

  if (activeScreen === 'book-demo') {
    return (
      <BookDemoScreen
        initialBatch={selectedBatch}
        onBackToBatches={() => navigateTo('batches')}
        onBackToHome={() => navigateTo('home')}
      />
    );
  }

  if (activeScreen === 'batches') {
    return (
      <BatchesScreen
        onBackToHome={() => navigateTo('home')}
        onNavigateToBookDemo={(batchName) => navigateTo('book-demo', batchName)}
      />
    );
  }

  if (activeScreen === 'meet-teacher') {
    return (
      <MeetTeacherScreen
        onBackToHome={() => navigateTo('home')}
        onBookCallClick={(batch) => navigateTo('book-demo', batch)}
      />
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* SOLIDROAD STYLE NAVIGATION BAR WITH INTERACTIVE MEGA-MENU DROPDOWN */}
      <Navbar
        onBookCallClick={(batch) => navigateTo('book-demo', batch)}
        onNavigateScreen={(screen) => navigateTo(screen)}
      />

      {/* MULTI-BACKGROUND SCROLL SECTIONS */}
      <main style={{ flex: 1 }}>
        {/* Section 1: Hero Banner (Soft Sky Blue Slate BG) */}
        <div className="section-bg-hero">
          <Hero onBookCallClick={(batch) => navigateTo('book-demo', batch)} />
        </div>
        
        {/* Section 2: Science Formula Decoders (Soft Amber Warm BG) */}
        <div className="section-bg-decoders" id="decoders">
          <div className="container">
            <ScienceFormulaDecoder />
          </div>
        </div>

        {/* Section 3: Brief Text-Only Teacher Snippet (Soft Emerald BG) */}
        <div className="section-bg-teacher">
          <div className="container">
            <AboutTeacher />
          </div>
        </div>

        {/* Section 4: Reviews 6-Card Grid (Soft Royal Blue BG) */}
        <div className="section-bg-reviews">
          <div className="container">
            <Testimonials />
          </div>
        </div>

        {/* Section 5: Center Location Map & Coordinates (Pearl Slate BG) */}
        <div className="section-bg-map">
          <div className="container">
            <LocationContact />
          </div>
        </div>
      </main>

      {/* Blinkit-Style Giant Blended Typography Footer */}
      <Footer />
    </div>
  );
}
