import React, { createContext, useContext, useState, useEffect } from "react";

const PanierContext = createContext();

export function usePanier() {
  return useContext(PanierContext);
}


export function PanierProvider({ children }) {

  
const API_URL = "http://localhost:5038/";

const [items, setItems] = useState([]);

useEffect(() => {
  fetch(API_URL + "api/app/Viandes")
    .then(response => response.json())
    .then(data => {
      // Process the data here
      setItems(data);
      // Handle the error here
    });
}, []);

const prix1 = items.map(item => ({
  id: item.id,
  titre: item.nom,
  quantité: 0,
  prix: item.prix_kilo
}));

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