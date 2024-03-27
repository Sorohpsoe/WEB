import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (
    <div>
      <button 
        onClick={() => {navigate("/achat");}} >Achat
      </button>

      <button 
        onClick={() => {navigate("/panier");}} >Panier
      </button>
      
    </div>
  );
}

export default Home;
