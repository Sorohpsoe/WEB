import React from "react";
import { useNavigate } from "react-router-dom";
import IconeProduit from '../IconeProduit.js';
import image from '../../assets/steak.jpg';
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
  ];

  return (
    <div>

      <button 
        onClick={() => {navigate("/panier");}} >Panier
      </button>

      <button onClick={() => {navigate("/");}}>Accueil</button>
      
      {prix.map((liste,idx) => (
        
        <IconeProduit image={image} liste={liste} index={index+idx}/>
      ))}
      
      <Banner /> 
      
    </div>
  );
}

export default Achat;
