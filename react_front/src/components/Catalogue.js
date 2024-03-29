import '../styles/Catalogue.css';
import {Input} from "./Catalogue/forms/Input.js"
import {Checkbox} from "./Catalogue/forms/Checkbox.js"
import {ProductCategoryRow} from "./Catalogue/products/ProductCategoryRow.js"
import {ProductRow} from "./Catalogue/products/ProductRow.js"
import React, { useState, useEffect } from 'react';
import { useSearch } from './SearchContext';

function Catalogue() {

    


const [data, setData] = useState([]);
const API_URL = "http://localhost:5038/";

useEffect(() => {
  // Fetch data from API and update the state
  fetch(API_URL + "api/app/Viandes")
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.error(error));
}, []);




const PRODUCTS = data.map(item => ({
  category: item.cat2,
  price: `${item.prix_kilo}€`,
  stocked: item.poids > 0,
  name: item.nom
}));

  const [showStockedOnly, setShowStockedOnly] = useState(false)
  const { search, setSearch } = useSearch();


  const visibleProducts = PRODUCTS.filter(product => {
    if (showStockedOnly && !product.stocked){
      return false
    }
      if (search.toLowerCase() && !product.name.toLowerCase().includes(search.toLowerCase()) && !product.category.toLowerCase().includes(search.toLowerCase())){
        return false
      }

      return true
  })

  return <div className ="catalogue-container my-3">
    <SearchBar 
    search={search}
    onSearchChange={setSearch}
    showStockedOnly={showStockedOnly} 
    onStockedOnlyChange={setShowStockedOnly}/>
    <ProductTable products ={visibleProducts}/>
  </div>


}


function SearchBar({showStockedOnly, onStockedOnlyChange, search, onSearchChange}) {
  return (
    <div>
      <div className="mb-3">
        <Input value={search} onChange={onSearchChange} placeholder="RECHERCHER . . ."/>
        <Checkbox 
          id="stocked" 
          checked={showStockedOnly} 
          onChange={onStockedOnlyChange} 
          label="N'afficher que les produits en stock" />
      </div>
      <div className="mb-3">
        <label htmlFor="category">Catégorie :</label>
        <select
          id="category"
          onChange={(e) => {
            const selectedCategory = e.target.value;
            // Mettre à jour la recherche en fonction de la catégorie sélectionnée
            onSearchChange(selectedCategory);
          }}
        >
          <option value="">Toutes les catégories</option>
          <option value="Abats">Abats</option>
          <option value="Pièce à griller">Pièce à griller</option>
          <option value="Pièce à braiser">Pièce à braiser</option>
          <option value="Préparations">Préparations</option>
          <option value="Huiles">Huiles</option>
          <option value="Farines">Farines</option>
        </select>
      </div>
    </div>
  );
}

function ProductTable({products}){

  products.sort((a, b) => {
    if (a.category < b.category) {
      return -1;
    }
    if (a.category > b.category) {
      return 1;
    }
    return 0;
  });
  const rows =[]
  let lastCategory = null

  for (let product of products){
      if (product.category !== lastCategory){
        rows.push(<ProductCategoryRow key={product.category} name={product.category} />)
      }
      lastCategory = product.category
      rows.push(<ProductRow product={product} key={product.name}/>)
  }
  return <table className="table">
    <thead>
    <tr>
      <th>Nom</th>
      <th>Prix</th>
    </tr>  
    </thead>
    <tbody>
    {rows}
    </tbody>
  </table>
}

export default Catalogue