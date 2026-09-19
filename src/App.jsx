import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScienceFormulaDecoder from './components/ScienceFormulaDecoder';
import AboutTeacher from './components/AboutTeacher';
import Testimonials from './components/Testimonials';
import LocationContact from './components/LocationContact';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import MeetTeacherScreen from './components/MeetTeacherScreen';
import BatchesScreen from './components/BatchesScreen';
import BookDemoScreen from './components/BookDemoScreen';
import AskToSirScreen from './components/AskToSirScreen';
import StudyMaterialsScreen from './components/StudyMaterialsScreen';

export default function App() {
  const [activeScreen, setActiveScreen] = useState('home'); // 'home' | 'book-demo' | 'meet-teacher' | 'batches' | 'ask-to-sir' | 'study-materials'
  const [selectedBatch, setSelectedBatch] = useState('Class 10th Science Board Special');

  const navigateTo = (screenName, batchName = null) => {
    if (batchName) {
      setSelectedBatch(batchName);
    }
    setActiveScreen(screenName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

      {/* Sticky Mobile Floating Dock */}
      <MobileBottomNav activeScreen={activeScreen} onNavigate={(screen) => navigateTo(screen)} />
    </div>
  );
}
