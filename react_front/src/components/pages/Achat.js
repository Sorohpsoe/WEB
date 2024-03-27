import React from "react";
import { Component } from "react";
import { useNavigate } from "react-router-dom";
import IconeProduit from '../IconeProduit.js';
import image from '../../assets/steak.jpg';
import Banner from '../Banner'


class Achat extends Component{

  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  };

  componentDidMount() {
    this.getItems();
  }
  
  API_URL = "http://localhost:5038/";
  
  getItems = async () => {
    fetch(this.API_URL+"api/app/Viandes")
      .then(response => response.json())
      .then(data => {
        this.setState({ items: data });
      });
  };
  
  async addClick() {
    var newViande=document.getElementById("newViande").value;
    const data =new FormData();
    data.append("newViande",newViande);
  
    fetch(this.API_URL+"api/app/AddViandes", {
      method: "POST",
      body: data
    }).then(res =>res.json())
    .then((result)=>  {
      alert(result);
      this.getItems()
    });  
  }
  async deleteClick(id) {
    fetch(this.API_URL + "api/app/DeleteViande?_id="+id, {
      method: "DELETE"
    }).then(res => res.json())
    .then((result) => {
      alert(result);
      this.getItems()
    });
  }
  



  render () {
    const { items } = this.state;
    //const navigate = useNavigate();
    //<button onClick={() => {navigate("/");}}>Accueil</button>

  
    const prix = [
      { id: 0, titre: "Produit A", prix: 10 },
      { id: 1, titre: "Produit B", prix: 20 },
      { id: 2, titre: "Produit C", prix: 30 },
      { id: 3, titre: "Produit D", prix: 40 },
    ];
  
  return (
    <div>

      {items.map((liste) => (
        <IconeProduit image={image} liste={liste}/>
      ))}
      <Banner /> 
      
    </div>
  );
}
}

export default Achat;

