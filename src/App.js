import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Accueil from './pages/Accueil';
import ResponsiveOverflowAnalyzer from "./utils/ResponsiveOverflowAnalyzer";

function App() {
  return (
      <>
          <Router>
              <Routes>
                  <Route path="/" element={ <Accueil /> } />
                  <Route path="/responsive" element={<ResponsiveOverflowAnalyzer />} />
              </Routes>
          </Router>
      </>
  );
}

export default App;
