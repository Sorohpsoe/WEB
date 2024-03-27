import React from "react";
import IconeProduit from '../IconeProduit.js';
import { image1, image2, image3 } from '../Images.js'; 
import Banner from '../Banner'
import Catalogue from '../Catalogue.js'
import { useSearch } from '../SearchContext';

import '../../styles/Achat.css';

function Achat() {
  
  let index = 0
  const { search } = useSearch();

  const isProductVisible = (liste) => {
    if (!search) {
      return true;
    }
    const searchTerm = search.toLowerCase();
    if (liste.name.toLowerCase().includes(searchTerm) ||
    liste.category.toLowerCase().includes(searchTerm)){
      return (true); 
    } else {
      return(false);
    }
     
  }
  
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
      <Banner />
      <Catalogue />
      <div className="icon-wrapper">
        <div className="icon-container">
          {prix.map((liste, idx) => (
            (isProductVisible(liste)) && (
            <div key={liste.id} className="icon-item">
              <IconeProduit image={image3} liste={liste} />
            </div>)
          ))}
        </div>
      </div>
    </div>
  );
}

export default Achat;
