import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScienceFormulaDecoder from './components/ScienceFormulaDecoder';
import AboutTeacher from './components/AboutTeacher';
import Batches from './components/Batches';
import Testimonials from './components/Testimonials';
import LocationContact from './components/LocationContact';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import BookDemoScreen from './components/BookDemoScreen';

export default function App() {
  const [activeScreen, setActiveScreen] = useState('home'); // 'home' | 'batches' | 'teacher' | 'book-demo' | 'contact'
  const [selectedBatch, setSelectedBatch] = useState('Class 10th Science Board Special');

  // Handle URL hash changes for native multi-screen navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'batches', 'teacher', 'book-demo', 'contact'].includes(hash)) {
        setActiveScreen(hash);
      } else {
        setActiveScreen('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (screenName, batchName = null) => {
    if (batchName) {
      setSelectedBatch(batchName);
    }
    setActiveScreen(screenName);
    window.location.hash = screenName;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (activeScreen === 'book-demo') {
    return (
      <BookDemoScreen
        preselectedBatch={selectedBatch}
        onBackToHome={() => navigateTo('home')}
      />
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar activeScreen={activeScreen} onNavigate={navigateTo} />

      <main style={{ flex: 1, paddingTop: '4.5rem' }}>
        {activeScreen === 'home' && (
          <>
            <Hero onBookCallClick={(batch) => navigateTo('book-demo', batch)} onExploreBatches={() => navigateTo('batches')} />
            
            <div className="container">
              <ScienceFormulaDecoder />
            </div>

            <AboutTeacher onExploreMore={() => navigateTo('teacher')} />
            <Batches onSelectBatch={(batch) => navigateTo('book-demo', batch)} />
            <Testimonials />
            <LocationContact onBookCallClick={(batch) => navigateTo('book-demo', batch)} />
          </>
        )}

        {activeScreen === 'batches' && (
          <div style={{ animation: 'modalFadeIn 0.3s ease-out' }}>
            <Batches onSelectBatch={(batch) => navigateTo('book-demo', batch)} />
          </div>
        )}

        {activeScreen === 'teacher' && (
          <div style={{ animation: 'modalFadeIn 0.3s ease-out' }}>
            <AboutTeacher />
          </div>
        )}

        {activeScreen === 'contact' && (
          <div style={{ animation: 'modalFadeIn 0.3s ease-out' }}>
            <LocationContact onBookCallClick={(batch) => navigateTo('book-demo', batch)} />
          </div>
        )}
      </main>

      <Footer onNavigate={navigateTo} />

      <MobileBottomNav activeScreen={activeScreen} onNavigate={navigateTo} />
    </div>
  );
}


