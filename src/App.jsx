import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScienceFormulaDecoder from './components/ScienceFormulaDecoder';
import AboutTeacher from './components/AboutTeacher';
import Batches from './components/Batches';
import Testimonials from './components/Testimonials';
import LocationContact from './components/LocationContact';
import Footer from './components/Footer';
import BookCallModal from './components/BookCallModal';
import MobileBottomNav from './components/MobileBottomNav';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState('Class 10th Science Board Special');

  const handleOpenModal = (batchName = 'Class 10th Science Board Special') => {
    if (typeof batchName === 'string') {
      setSelectedBatch(batchName);
    }
    setIsModalOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onBookCallClick={handleOpenModal} />

      <main style={{ flex: 1 }}>
        <Hero onBookCallClick={handleOpenModal} />
        
        <div className="container">
          <ScienceFormulaDecoder />
        </div>

        <AboutTeacher />
        <Batches onSelectBatch={handleOpenModal} />
        <Testimonials />
        <LocationContact onBookCallClick={handleOpenModal} />
      </main>

      <Footer onBookCallClick={handleOpenModal} />

      <MobileBottomNav onBookCallClick={handleOpenModal} />

      <BookCallModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        preselectedBatch={selectedBatch}
      />
    </div>
  );
}
