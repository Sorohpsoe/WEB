import React from "react";
import { useNavigate } from "react-router-dom";
import { usePanier } from "../PanierContext";
import emailjs from 'emailjs-com'; // Importez le module EmailJS
import "../../styles/Panier.css"; // Import du fichier CSS
import image from '../../assets/steak.jpg';


function Panier() {
  
  const navigate = useNavigate();
  const templateID = "template_3ns12gc"
  const serviceID = "service_yt825eq"
  const userID = "WhJD9B8oAATOEHYRG"

  const { panierclient }  = usePanier();
  console.log(panierclient);

  // Fonction pour envoyer un e-mail
  const envoyerEmail = () => {
    // Remplacez 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID' et 'YOUR_USER_ID' par les valeurs de votre compte EmailJS
    emailjs.send(serviceID, templateID, {
      to_email: 'tangskor@gmail.com', // Remplacez par l'adresse e-mail du destinataire
      from_name: 'Tanguy', // Remplacez par votre nom ou votre nom d'entreprise
      // Ajoutez d'autres champs du modèle d'e-mail si nécessaire
      panier_details: JSON.stringify(panierclient) // Ajoutez les détails du panier au modèle d'e-mail
    }, userID)
    .then((result) => {
      console.log(result.text);
      alert('E-mail envoyé avec succès!');
    }, (error) => {
      console.log(error.text);
      alert('Une erreur s\'est produite lors de l\'envoi de l\'e-mail.');
    });
  };

  return (
    <div className="panier-container">
      <button className="button-accueil" onClick={() => {navigate("/");}}>Accueil </button>
  
      <h2 className="panier-title">Panier</h2>
      
      <div className="panier-items">
        {panierclient.map((produit) => (
          produit.quantité > 0 && (
            <div key={produit.id} className="panier-item">
              <img src={image} alt="Steak" className="item-image"/>
              <div className="item-details">
                <h3 className="item-title">{produit.titre}   </h3>
                <h4 className="item-price">Prix indicatif : {produit.prix*produit.quantité}€</h4>
                <h5 className="item-quantity">Quantité : {produit.quantité}</h5>
                
              </div>
            </div>
          )
        ))}
      </div>
      
      <button className="button-valider-panier" onClick={envoyerEmail}>Valider Panier</button>
    </div>
  );
  
}

export default Panier;
