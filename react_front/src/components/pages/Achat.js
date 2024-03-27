import React from "react";
import { useNavigate } from "react-router-dom";
import IconeProduit from '../IconeProduit.js';
import image from '../../assets/steak.jpg';
import Banner from '../Banner'


function Achat() {

  const navigate = useNavigate();
  
  
  const prix = [
    { category: "Plancha",price:"3€",stocked:true, name:"Entrecôte", id: 0},
    { category: "Plancha",price:"5€",stocked:true, name:"Steak" ,id:1},
    { category: "Barbecue",price:"1€",stocked:false, name:"Côte",id:2 },
    { category: "Barbecue",price:"999€",stocked:true, name:"Groin mdrrrrrrrrrrrrrrrrrrr",id:3 },
    { category: "Vache",price:"69€",stocked:false, name:"La mère à tanguy",id:4 },
    { category: "Plancha",price:"10€",stocked:true, name:"sirène",id:5},
  
  ]

  return (
    <div>
      <button onClick={() => {navigate("/");}}>Accueil</button>

      {prix.map((liste) => (
        <IconeProduit image={image} liste={liste}/>
      ))}
      <Banner /> 
      
    </div>
  );
}

export default Achat;
