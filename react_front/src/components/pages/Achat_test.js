import {Component} from "react";
import { Form, useNavigate } from "react-router-dom";
import IconeProduit from '../IconeProduit.js';
import image from '../../assets/steak.jpg';
import Banner from '../Banner.js'


class Achat extends Component {

constructor(props) {
  super(props);
  this.state = {
    items: []
  };
}

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

  return (
    <div className="App">
      <h1>Items</h1>
      <input id="newViande"/>&nsbp;
      <button onClick={() => this.addClick()}>Add viande</button>
      {items.map(item =>
        <p>
          <b> * {item.description} - {item.prix}€ - {item._id}</b>&nsbp;
          <button onClick={() => this.deleteClick(item._id)}>Delete viande</button>
        </p> 
      )}
    </div>
  );
}
}

export default Achat;
