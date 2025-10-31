import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Accueil from './pages/Accueil';
import JeDeviens from './pages/Je-deviens';
import ResponsiveOverflowAnalyzer from "./utils/ResponsiveOverflowAnalyzer";

function App() {
  return (
      <>
          <Router>
              <Routes>
                  <Route path="/" element={ <Accueil /> } />
                  <Route path="/je-deviens-benevole" element={<JeDeviens/>}/>
                  <Route path="/responsive" element={<ResponsiveOverflowAnalyzer />} />
              </Routes>
          </Router>
      </>
  );
}

export default App;
