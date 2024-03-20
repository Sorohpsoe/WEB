import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import Achat from "./pages/Achat.js";
import Panier from "./pages/Panier.js";

// Afficher l'image importée
function App(){
  // Liste des prix

  return(
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/achat" element={<Achat />} />
          <Route path="/panier" element={<Panier />} />
        </Routes>
      </Router>

      
      
    </div>
  )
}

export default App;
