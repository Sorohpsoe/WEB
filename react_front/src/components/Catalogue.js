import {Input} from "./Catalogue/forms/Input.js"
import {Checkbox} from "./Catalogue/forms/Checkbox.js"
import {ProductCategoryRow} from "./Catalogue/products/ProductCategoryRow.js"
import {ProductRow} from "./Catalogue/products/ProductRow.js"
import React, { useState } from 'react';


const PRODUCTS = [
  { category: "Plancha",price:"3€",stocked:true, name:"Entrecôte" },
  { category: "Plancha",price:"5€",stocked:true, name:"Steak" },
  { category: "Barbecue",price:"1€",stocked:false, name:"Côte" },
  { category: "Barbecue",price:"999€",stocked:true, name:"Groin mdrrrrrrrrrrrrrrrrrrr" },
  { category: "Vache",price:"69€",stocked:false, name:"La mère à tanguy" },
  { category: "Plancha",price:"10€",stocked:true, name:"sirène" },

]

function Catalogue() {
  
  const [showStockedOnly, setShowStockedOnly] = useState(false)
  const [search,setSearch] = useState('')


  const visibleProducts = PRODUCTS.filter(product => {
    if (showStockedOnly && !product.stocked){
      return false
    }
      if (search.toLowerCase() && !product.name.toLowerCase().includes(search.toLowerCase()) && !product.category.toLowerCase().includes(search.toLowerCase())){
        return false
      }

      return true
  })

  return <div className ="container my-3">
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
          label="N'AFFICHER QUE LES PRODUITS EN STOCK"/>
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
          <option value="Plancha">Plancha</option>
          <option value="Barbecue">Barbecue</option>
          <option value="Vache">Vache</option>
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