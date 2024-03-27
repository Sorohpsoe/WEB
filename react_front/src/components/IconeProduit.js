import '../styles/IconeProduit.css';
import { useState } from "react";
import { Link } from "react-router-dom";
import { usePanier } from "./PanierContext";

export default function IconeProduit (props) {

  
  const { panierclient, modifierPanier } = usePanier();
  const { liste, image, index } = props;
  
  // state
  const prix = liste.price;

  const titre = liste.name;
  
  const [compteur, setCompteur] = useState(0);

  const isMobile = window.innerWidth <= 767; // Vérifie si l'écran est de taille mobile

  const position = {
    top: Math.floor(index / 4) * (270 + 20) + 200, // 270px est la hauteur d'une icône plus son espacement
    left: isMobile ? (index % 2) * (220 + 20) + 300 : (index % 4) * (220 + 20) + 300, // 25vw est la largeur d'une icône plus son espacement, 1vw pour l'espacement, 3vw pour le padding
  };
  


  // events
  const handleAdd = () => {
    setCompteur(compteur + 1);
  };

  const handleRemove = () => {
    if (compteur>0){
      setCompteur(compteur - 1);
    }
  };

  const handleBasket = () => {
    // Recherchez si le produit existe déjà dans le panier
    const produitExistantIndex = panierclient.findIndex(
      (produit) => produit.id === liste.id
    );

    if (produitExistantIndex !== -1) {
      // Si le produit existe déjà, mettez à jour sa quantité dans le panier
      const nouveauPanier = [...panierclient];
      nouveauPanier[produitExistantIndex].quantité += compteur;
      modifierPanier(nouveauPanier);
    } else {
      // Si le produit n'existe pas encore dans le panier, ajoutez-le
      const produit = {
        id: liste.id,
        titre: liste.titre, // Assurez-vous de définir la propriété "titre" appropriée dans votre props
        quantité: compteur
      };
      modifierPanier([...panierclient, produit]);
    }
    alert("Article ajouté au panier ! ")

    setCompteur(0);

  };

  // render
  return(
    <div className="gray-box" style={{...position, position: 'absolute'}}>
      <div className="text-on-box">{prix}€</div>
      <Link to={`/detail-produit/${id}`}>
      <img src={image} alt="Steak" className="PhotoViande"/>
      </Link>
      <div className="compteur"> 
        <button onClick={handleRemove}>-</button>
        {" "}{compteur}{" "} 
        <button onClick={handleAdd}>+</button>
      </div>
      
      <div className="AddBasket">
        <button onClick={handleBasket}>Ajouter au panier</button>
      </div>
    </div>
  );

}

