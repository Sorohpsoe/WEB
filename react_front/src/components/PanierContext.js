import React, { createContext, useContext, useState, useEffect } from "react";

const PanierContext = createContext();

export function usePanier() {
  return useContext(PanierContext);
}


export function PanierProvider({ children }) {

  
  const [data, setData] = useState([]);
  const API_URL = "http://localhost:5038/";

  useEffect(() => {
    // Fetch data from API and update the state
    fetch(API_URL + "api/app/Viandes")
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);


  const [panierclient, setPanierclient] = useState([]);

  useEffect(() => {
    // Map the data from API to the desired format
    const mappedData = data.map(item => ({
      id: item.id,
      titre: item.nom,
      quantité: 0,
      prix: item.prix_kilo,
      poids: item.poids,
      poids_indicatif: item.poids_indicatif,
    }));

    // Set the mapped data to the state
    setPanierclient(mappedData);
  }, [data]);

  const modifierPanier = (nouveauPanier) => {
    setPanierclient(nouveauPanier);
  };

  return (
    <PanierContext.Provider value={{ panierclient, modifierPanier }}>
      {children}
    </PanierContext.Provider>
  );
}