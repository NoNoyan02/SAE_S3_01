import {Route, Routes} from 'react-router-dom';
import './App.css'

// Toutes les pages importer
import Accueil from 'pages/Accueil';
import JeDonne from '../../SAES301/src/pages/Je-donne';
// import JeDeviens from '../../SAES301/src/pages/Je-deviens';
// import Formations from '../../SAES301/src/pages/Formations';
// import Donation from '../../SAES301/src/pages/Donation';
// import PageIntrouvable from "../../SAES301/src/pages/Page-introuvable";

// Utilitaires
// import ResponsiveOverflowAnalyzer from "./utils/ResponsiveOverflowAnalyzer";

function App() {

  return (
      <>
          <div className="page-content">
          <Routes>
              <Route path="/" element={<Accueil/>}/>
              <Route path="/JeDonne" element={<JeDonne/>}/>
          </Routes>

          </div>
      </>
  );
}

export default App
