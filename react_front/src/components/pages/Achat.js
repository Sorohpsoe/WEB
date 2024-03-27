import React from "react";
import { useNavigate } from "react-router-dom";
import IconeProduit from '../IconeProduit.js';
import { image1, image2, image3 } from '../Images.js'; 
import Banner from '../Banner'

import '../../styles/Achat.css';

function Achat() {

  let index = 0
  const navigate = useNavigate();
  
  const prix = [
    { id: 0, titre: "Produit A", prix: 10 },
    { id: 1, titre: "Produit B", prix: 20 },
    { id: 2, titre: "Produit C", prix: 30 },
    { id: 3, titre: "Produit D", prix: 40 },
    { id: 3, titre: "Produit E", prix: 50 },
  ];

  return (
    <div>

      <button 
        onClick={() => {navigate("/panier");}} >Panier
      </button>

      <button onClick={() => {navigate("/");}}>Accueil</button>
      
      <div className="page-container">
        {prix.map((liste,idx) => (
          
          <IconeProduit image={image3} liste={liste} index={index+idx}/>
        ))}
      </div>
      
      
      <Banner /> 
      
    </div>
  );
}

export default Achat;
