import '../styles/IconeProduit.css';
import { useState } from "react";
import { Link } from "react-router-dom";
import { usePanier } from "./PanierContext";
import { useSearch } from './SearchContext';

export default function IconeProduit (props) {

  const { search } = useSearch();
  const { panierclient, modifierPanier } = usePanier();
  const { liste, image, index } = props;
  
  // state
  const prix = liste.price;

  const titre = liste.name;
  const id = liste.id;
  
  const [compteur, setCompteur] = useState(0);

  const isMobile = window.innerWidth <= 767; // Vérifie si l'écran est de taille mobile
  

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
    <div className="gray-box" style={{...position, position: 'absolute'}}>
      <div className="text-on-box">
        <div>{titre}</div>
        <div>{prix}</div>
    </div>
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

