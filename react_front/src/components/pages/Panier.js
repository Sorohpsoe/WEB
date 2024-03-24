import React from "react";
import { useNavigate } from "react-router-dom";
import { usePanier } from "../PanierContext";
import "../../styles/Panier.css"; // Import du fichier CSS
import image from '../../assets/steak.jpg';

function Panier() {
  
  const navigate = useNavigate();

  const { panierclient }  = usePanier();
  console.log(panierclient);

  return (
    <div className="panier-container">
      <button className="button-accueil" onClick={() => {navigate("/");}}>Accueil </button>

      <h2 className="panier-title">Panier</h2>
      
      <div className="panier-items">
        {panierclient.map((produit) => (
          <div key={produit.id} className="panier-item">
            <img src={image} alt="Steak" className="item-image"/>
            <div className="item-details">
              <h3 className="item-title">{produit.titre}</h3>
              <p className="item-price">Prix indicatif : {produit.prix}€</p>
              <p className="item-quantity">Quantité : {produit.quantité}</p>
              {/* Ajout de l'image de steak */}
              
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Panier;
