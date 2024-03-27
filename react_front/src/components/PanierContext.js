import React, { createContext, useContext, useState } from "react";

const PanierContext = createContext();

export function usePanier() {
  return useContext(PanierContext);
}


export function PanierProvider({ children }) {
  const [panierclient, setPanierclient] = useState([
    { id: 0, titre: "Produit A", quantité: 0, prix :10 },
    { id: 1, titre: "Produit B", quantité: 0, prix : 20 },
    { id: 2, titre: "Produit C", quantité: 0, prix : 30},
    { id: 3, titre: "Produit D", quantité: 0, prix : 40 },
    { id: 4, titre: "Produit E", quantité: 0, prix : 50 },
  ]);
 

  const modifierPanier = (nouveauPanier) => {
    setPanierclient(nouveauPanier);
  };

  
  return (
    <PanierContext.Provider value={{ panierclient, modifierPanier }}>
      {children}
    </PanierContext.Provider>
  );
}