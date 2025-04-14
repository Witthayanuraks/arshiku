import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import './index.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


const App = () => {
  return (
    <div className="min-h-screen flex bg-lightGray">
      <Sidebar />
      <main className="flex-1 p-8">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
