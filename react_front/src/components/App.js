import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PanierProvider } from "./PanierContext";
import Home from "./pages/Home.js";
import Achat from "./pages/Achat.js";
import Panier from "./pages/Panier.js";
import ProductView from "./ProductView";

import Catalogue from './Catalogue.js'

// Afficher l'image importée
function App(){
  // Liste des prix

  const prix = [
    { id: 0, titre: "Produit A", prix: 10 },
    { id: 1, titre: "Produit B", prix: 20 },
    { id: 2, titre: "Produit C", prix: 30 },
    { id: 3, titre: "Produit D", prix: 40 },
  ];
  return(
    
    <div>
      
      <Router>
        <PanierProvider>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail-produit/:id" element={<ProductView />} />
          <Route path="/achat" element={<Achat />} />
          <Route path="/panier" element={<Panier />} />
          
        </Routes>

        </PanierProvider>
      </Router>
      <Catalogue />
    </div>
  )
}

export default App;

