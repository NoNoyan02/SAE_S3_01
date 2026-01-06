import {Route, Routes} from 'react-router-dom';

// Toutes les pages
import Accueil from './pages/Accueil.jsx';
import JeDonne from './pages/Je-donne.jsx';
import JeDeviens from './pages/Je-deviens.jsx';
import Formations from './pages/Formations.jsx';
import Donation from './pages/Donation.jsx';
import PageIntrouvable from './pages/Page-introuvable.jsx';

function App() {

  return (
      <>
          <Routes>
              <Route path="/" element={<Accueil/>}/>
              <Route path="/je-deviens-benevole" element={<JeDeviens/>}/>
              <Route path="/je-donne" element={<JeDonne/>}/>
              <Route path="/formations" element={<Formations/>}/>
              <Route path="/faire-un-don/~mon-don" element={<Donation/>}/>
              <Route path="*" element={<PageIntrouvable/>}/>©
          </Routes>
      </>
  );
}

export default App
