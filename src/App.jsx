import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScienceFormulaDecoder from './components/ScienceFormulaDecoder';
import AboutTeacher from './components/AboutTeacher';
import Batches from './components/Batches';
import BookDemoSection from './components/BookDemoSection';
import Testimonials from './components/Testimonials';
import LocationContact from './components/LocationContact';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';

export default function App() {
  const [selectedBatch, setSelectedBatch] = useState('Class 10th Science Board Special');

  const handleOpenBookDemo = (batchName = 'Class 10th Science Board Special') => {
    if (typeof batchName === 'string') {
      setSelectedBatch(batchName);
    }
    const demoElement = document.getElementById('book-demo');
    if (demoElement) {
      demoElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onBookCallClick={handleOpenBookDemo} />

      <main style={{ flex: 1 }}>
        <Hero onBookCallClick={handleOpenBookDemo} />
        
        <div className="container">
          <ScienceFormulaDecoder />
        </div>

        <AboutTeacher />
        <Batches onSelectBatch={handleOpenBookDemo} />
        
        {/* Inline 2 Free Demo Booking Section */}
        <BookDemoSection preselectedBatch={selectedBatch} />

        <Testimonials />
        <LocationContact onBookCallClick={handleOpenBookDemo} />
      </main>

      <Footer onBookCallClick={handleOpenBookDemo} />

      <MobileBottomNav onBookCallClick={handleOpenBookDemo} />
    </div>
  );
}

