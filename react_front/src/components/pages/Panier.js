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
  const userID = "WhJD9B8oAATOEHYRGnope"

  const { panierclient }  = usePanier();
  console.log(panierclient);


  // Fonction pour gérer le stock
  const gestion_stock = () => {
    panierclient.forEach(produit => {
      console.log("Produit: ", produit);
      console.log("Quantité: ", produit.quantité);
      console.log("ID: ", produit.id);
      fetch(`http://localhost:5038/api/app/Viandes/${produit.id}`)
        .then(response => response.json())
        .then(data => {
          console.log("Data: ", data);
          console.log("Stock: ", data.quantite);
          const newStock = data.quantite - produit.quantité;
          console.log("New stock: ", newStock);




          fetch(`http://localhost:5038/api/app/Viandes/${produit.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              quantite: newStock,
            }),
          })
            .then(response => response.json())
            .then(data => {
              console.log("Data: ", data);
            });
        });
    });
  }

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
      
      <button className="button-valider-panier" onClick={()=>gestion_stock()}>Valider Panier</button>
    </div>
  );
}

export default Panier;
