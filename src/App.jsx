import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';

import Header from "@/components/Header/Header.jsx";
import Footer from "@/components/Footer/Footer.jsx";
import ScrollToTop from '@/components/ScrollToTop';

// Importation de toutes les pages
import Accueil from './pages/Accueil.jsx';
import JeDonne from './pages/Je-donne.jsx';
import JeDeviens from './pages/Je-deviens.jsx';
import Formations from './pages/Formations.jsx';
import Donation from './pages/Donation.jsx';
import PageIntrouvable from './pages/Page-introuvable.jsx';
import Dashboard from "../SAES301/src/pages/Dashboard.jsx";

const MainLayout = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <main style={{ flex: 1 }}>
                {<Outlet />}
            </main>
            <Footer />
        </div>
    );
};

function App() {

  return (
      <>
          <ScrollToTop />
          <Routes>
              <Route element={<MainLayout />}>
                  <Route path="/" element={<Accueil/>}/>
                  <Route path="/je-deviens-benevole" element={<JeDeviens/>}/>
                  <Route path="/je-donne" element={<JeDonne/>}/>
                  <Route path="/formations" element={<Formations/>}/>
                  <Route path="*" element={<PageIntrouvable/>}/>
              </Route>
              <Route path="/faire-un-don/~mon-don" element={<Donation/>}/>
              <Route path="/admin/dashboard" element={<Dashboard/>}/>
          </Routes>
      </>
  );
}

export default App
