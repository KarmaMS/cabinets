import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Products from './components/Products';
import KitchenLayouts from './components/KitchenLayouts';
import Gallery from './components/Gallery';
import About from './components/About';
import Contact from './components/Contact';
import Store from './components/Store';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ModularKitchen from './pages/ModularKitchen';
import ModularKitchenDesign from './pages/ModularKitchenDesign';
import KitchenDesign from './pages/KitchenDesign';
import ModularWardrobe from './pages/ModularWardrobe';
import TVPanel from './pages/TVPanel';
import BathroomVanity from './pages/BathroomVanity';
import LocationLogger from './components/LocationLogger';
import ScrollToTop from './components/ScrollToTop'; 
import LShapedKitchen from './pages/LShapedKitchen';
import UShapedKitchen from './pages/UShapedKitchen';
import GShapedKitchen from './pages/GShapedKitchen';
import InLineKitchen from './pages/InLineKitchen';
import ParallelKitchen from './pages/ParallelKitchen';
import IslandKitchen from './pages/IslandKitchen';
import ItalianKitchen from './pages/ItalianKitchen';
import GermanKitchen from './pages/GermanKitchen';
import WalkInCloset from './pages/WalkInCloset';
import SlidingDoors from './pages/SlidingDoors';
import OpenableShutter from './pages/OpenableShutter';
import Process from './pages/Process';
import Testimonials from './pages/Testimonials';
import AboutUS from './pages/AboutUs';
import ContactUs from './pages/ContactUs';

function App() {
  return (
    <Router>
      <LocationLogger />
      <ScrollToTop />
      <div className="min-h-screen">
        <TopBar />
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              <Products />
              <KitchenLayouts />
              <Gallery />
              <About />
              <Contact />
            </>
          } />
          <Route path="/products/modular-kitchen" element={<ModularKitchen />} />
          <Route path="/products/modular-kitchen-design" element={<ModularKitchenDesign />} />
          <Route path="/products/kitchen-design" element={<KitchenDesign />} />
          <Route path="/products/modular-wardrobe" element={<ModularWardrobe />} />
          <Route path="/products/tv-panel" element={<TVPanel />} />
          <Route path="/products/bathroom-vanity" element={<BathroomVanity />} />
          <Route path="/kitchen/l-shaped-kitchen" element={<LShapedKitchen />} />
          <Route path="/kitchen/u-shaped-kitchen" element={<UShapedKitchen />} />
          <Route path="/kitchen/g-shaped-kitchen" element={<GShapedKitchen />} />
          <Route path="/kitchen/in-line-kitchen" element={<InLineKitchen />} />
          <Route path="/kitchen/parallel-kitchen" element={<ParallelKitchen />} />
          <Route path="/kitchen/island-kitchen" element={<IslandKitchen />} />
          <Route path="/kitchen/italian-kitchen" element={<ItalianKitchen />} />
          <Route path="/kitchen/german-kitchen" element={<GermanKitchen />} />
          <Route path="/wardrobe/walk-in-closet" element={<WalkInCloset />} />
          <Route path="/wardrobe/sliding-doors" element={<SlidingDoors />} />
          <Route path="/wardrobe/openable-shutter" element={<OpenableShutter />} />
          <Route path="/our-process" element={<Process />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/stores" element={<Store />} />
          <Route path="/about-us" element={<AboutUS />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;