import React from "react";
import { useNavigate } from "react-router-dom";
import { usePanier } from "../PanierContext";

//import { useState } from "react";

function Panier() {
  
  const navigate = useNavigate();

  const { panierclient }  = usePanier();
  console.log(panierclient);

  return (
    <div>
      
      <button onClick={() => {navigate("/");}}>Accueil </button>

      <h2>Panier</h2>
      {/* Utilisez la méthode map() pour parcourir chaque élément de la liste panier */}
      
      <ul>
        {panierclient.map((produit) => (
          <li key={produit.id}>
            {produit.titre} - Quantité : {produit.quantité} - Prix indicatif : {produit.prix}€
          </li>
        ))}
      </ul>

    </div>
  );
}

export default Panier;



