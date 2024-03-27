import React from 'react'
import '../../styles/ProductView.css'; // Assurez-vous que le fichier CSS est correctement importé
import steak from '../../assets/steak.jpg'
import { useParams } from 'react-router-dom';


const products = [
  { category: "Plancha",price:"3€",stocked:true, name:"Entrecôte", id: 0,description: 'Description du produit 1'},
  { category: "Plancha",price:"5€",stocked:true, name:"Steak" ,id:1,description: 'Description du produit 2'},
  { category: "Barbecue",price:"1€",stocked:false, name:"Côte",id:2,description: 'Description du produit 3' },
  { category: "Barbecue",price:"999€",stocked:true, name:"Groin mdrrrrrrrrrrrrrrrrrrr",id:3,description: 'Description du produit 4' },
  { category: "Vache",price:"69€",stocked:false, name:"La mère à tanguy",id:4,description: 'Description du produit 5' },
  { category: "Plancha",price:"10€",stocked:true, name:"sirène",id:5,description: 'Description du produit 6'},

]


function ProductView() {
  // Récupérer l'ID du produit à partir de l'URL
  const { id } = useParams();


  // Trouvez le produit correspondant à l'ID dans le tableau de produits
  const product = products.find(product => product.id === parseInt(id));
  // Vérifier si le produit existe
  if (!product) {
    return <div>Produit non trouvé</div>;
  } else {
    return (
      <div className="product_container">
        <div className="product">
          <img src={steak} alt="La mère à tanguy" />
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p className="price">Prix: ${product.price}</p>
          <a href="#" className="button">Acheter maintenant</a>
        </div>
        <footer className="footer">
          <p>© 2024 Votre entreprise. Tous droits réservés.</p>
        </footer>
      </div>
    );
  }
}
export default ProductView;