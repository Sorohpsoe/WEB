import React from "react";
import { useNavigate } from "react-router-dom";
//import { useState } from "react";

function Panier() {
  
  const navigate = useNavigate();

  const panierclient = [
    { id: 0, titre: "Produit A", quantité: 0 },
    { id: 1, titre: "Produit B", quantité: 0 },
    { id: 2, titre: "Produit C", quantité: 0 },
    { id: 3, titre: "Produit D", quantité: 0 },
  ];

  return (
    <div>
      <button onClick={() => {navigate("/");}}>Accueil </button>

      <h2>Panier</h2>
      {/* Utilisez la méthode map() pour parcourir chaque élément de la liste panier */}
      <ul>
        {panierclient.map((produit) => (
          <li key={produit.id}>
            {produit.titre} - Quantité : {produit.quantité}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default Panier;



