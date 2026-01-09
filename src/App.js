import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HeadMeta from "./HeadMeta";

// Toutes les pages importer
import Accueil from './pages/Accueil';
import JeDonne from "./pages/Je-donne";
import JeDeviens from './pages/Je-deviens';
import Formations from './pages/Formations';
import Donation from './pages/Donation';
import PageIntrouvable from "./pages/Page-introuvable";

// Utilitaires
// import ResponsiveOverflowAnalyzer from "./utils/ResponsiveOverflowAnalyzer";

function App() {
  return (
      <>
          <HeadMeta/>
          <Router>
              <Routes>
                  <Route path="/" element={<Accueil/>}/>
                  <Route path="/je-deviens-benevole" element={<JeDeviens/>}/>
                  <Route path="/je-donne" element={<JeDonne/>}/>
                  <Route path="/formations" element={<Formations/>}/>
                  <Route path="/faire-un-don/~mon-don" element={<Donation/>}/>
                  {/*<Route path="/responsive" element={<ResponsiveOverflowAnalyzer />} />*/}
                  <Route path="*" element={<PageIntrouvable/>}/>
              </Routes>
          </Router>
      </>
  );
}

export default App;
