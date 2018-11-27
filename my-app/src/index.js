import './style/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import restaurants from  './Liste-restaurants_lafourchette';
import 'bootstrap/dist/css/bootstrap.min.css';

var accents = require('remove-accents');

function IsOfferMichelin(props){
	const michelin_offer = props.value[0];
	if(michelin_offer && michelin_offer.description !== ""){
		 return <b>Offre(s) Michelin :</b>;
	}
	return null;
}

function IsOfferLaFourchette(props){
	const offerLafourchette = props.value[0];
	if(offerLafourchette && offerLafourchette.title !== ""){
		 return <b>Offre(s) La-Fourchette :</b>;
	}
	return null;
}

function OneStar(restaurant){
	const star=restaurant.stars;
	if(star==="1 étoile")
		return true;
	return false;
}

function TwoStars(restaurant){
	const star=restaurant.stars;
	if(star==="2 étoiles")
		return true;
	return false;
}

function ThreeStars(restaurant){
	const star=restaurant.stars;
	if(star==="3 étoiles")
		return true;
	return false;
}

function getRestaurantByStars(one,two,three){
	var tab= [];
	restaurants.map((restaurant)=>{
		var onestar=OneStar(restaurant);
		var twostar=TwoStars(restaurant);
		var threestar=ThreeStars(restaurant);
		if(one === true &&  onestar === true){
			tab.push(restaurant);
		}
		if(two === true &&  twostar === true){
			tab.push(restaurant);
		}
		if(three === true &&  threestar === true){
			tab.push(restaurant);
		}
	})
	if(tab.length<=null){
		tab=restaurants;
	}
	return tab;

}

class Checkbox extends React.Component {
  constructor(props) {
	    super(props);
	    this.state = {checked: false, checked2: false,checked3: false};
	    this.handleChange = this.handleChange.bind(this);
	    this.handleChange2 = this.handleChange2.bind(this);
	    this.handleChange3 = this.handleChange3.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	  }  

	  handleChange(event) {
	    this.setState({
	        checked: !this.state.checked     
	    	})
		}

	  handleChange2(event) {
	    this.setState({
	        checked2: !this.state.checked2     
	    	})
		 }

	  handleChange3(event) {
	    this.setState({
	        checked3: !this.state.checked3    
	    	})
		 }
		handleSubmit(event){
			 ReactDOM.render(
			    <Restaurants value={getRestaurantByStars(this.state.checked,this.state.checked2,this.state.checked3)}/>,
				  document.getElementById('root')
				);
			 event.preventDefault();
		}
	  render() {
	    const togglecheck1 = !this.state.checked ? 'hidden-check1' : '';
	    const togglecheck2 = !this.state.checked2 ? 'hidden-check2' : '';
	    const togglecheck3 = !this.state.checked3 ? 'hidden-check3' : '';

	    return(
	    	<form onSubmit={this.handleSubmit}>
		        <div class="container">
		        <div class="row">
		        	<div class="col-auto no-gutters">
			        <label>1 Etoile</label>
			        </div>
			        <div class="col-auto no-gutters">
			        <input type="checkbox" id="chk1"className="chk11" checked={ this.state.checked } onChange={ this.handleChange } />
			        </div>
			        <div class="col-auto no-gutters">
			        <label>2 Etoiles</label>
			        </div>
			        <div class="col-auto no-gutters">
			        <input type="checkbox" id="chk2" className="chk22" checked={ this.state.checked2 } onChange={ this.handleChange2 } />
			        </div>
			        <div class="col-auto no-gutters">
			        <label>3 Etoiles</label>
			        </div>
			        <div class="col-auto no-gutters">
			        <input type="checkbox" id="chk3" className="chk33" checked={ this.state.checked3 } onChange={ this.handleChange3 } />
			        </div>
			        </div>
	        		<input type="submit" value="Search" />
		      	

		      	</div>
	        </form>
	    );
	  }
}

class Dropdown extends React.Component {
constructor(){
 super();

 this.state = {
       displayMenu: false,
       value:'',
     };

  this.showDropdownMenu = this.showDropdownMenu.bind(this);
  this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
  this.handleChange=this.handleChange.bind(this);

};
handleChange(event){
	this.setState({value:event.target.value})
	ReactDOM.render(
			    <Restaurants value={filterRestaurant(this.state.value)}/>,
				  document.getElementById('root')
				);
			 event.preventDefault();
}
showDropdownMenu(event) {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
    document.addEventListener('click', this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener('click', this.hideDropdownMenu);
    });

  }

  render() {
    return (
        <div  className="dropdown">
        <br></br>
         <div type="submit" className="button" onClick={this.showDropdownMenu}>Cuisine :  </div>

          { this.state.displayMenu ? (
          <ul>
         <li><a className="active" value="" onChange={this.handleChange}>Tous les types</a></li>
         <li><a value="Moderne" onChange={this.handleChange}>Moderne</a></li>
         <li><a value="Gastronomique" onChange={this.handleChange}>Gastronomique</a></li>
         <li><a value="Régionale Française" onChange={this.handleChange}>Régionale Française</a></li>
         <li><a value="Végétarien" onChange={this.handleChange}>Végétarien</a></li>
         <li><a value="Traditionnelle" onChange={this.handleChange}>Traditionnelle</a></li>
          </ul>
        ):
        (
          null
        )
        }

       </div>

    );
  }
}

function filterRestaurant(type){
	var tab=[];
	
		restaurants.map((restaurant)=>{
		if(aContainsB(accents.remove(restaurant.cuisine).toLowerCase(),accents.remove(type).toLowerCase()))
			tab.push(restaurant);
		return null;
	});
	
	return tab;
}
function getRestaurantByName(name){
	var tab=[];
	restaurants.map((restaurant)=>{
		if(aContainsB(accents.remove(restaurant.title).toLowerCase(),accents.remove(name).toLowerCase()))
			tab.push(restaurant);
		return null;
	})
	return tab;
}



function aContainsB (a, b) {
    return a.indexOf(b) >= 0;
}

class DealLaFourchette extends React.Component{
	render() {
		return(
			<ul>{this.props.value.title}<br/>{this.props.value.description}</ul>
		)
	}	
}
class MichelinOffers extends React.Component{
	render() {
		return(
			<div>
				<ul>{this.props.value.description}<br/>{this.props.value.validity}</ul>
			</div>
		)
	}	
}

class Restaurantsaddress extends React.Component{
	render() {
		return(
			<ul class="address">

				{this.props.value.street_block}<br/>
				{this.props.value.postal_code}<br/>
				{this.props.value.locality}
			</ul>
		)
	}
}

class SearchBar extends React.Component {
	constructor(props) {
	  	super(props);

	    this.state = {value: ''};
	    this.handleChange = this.handleChange.bind(this);
	  }

	handleChange(event) {
	    this.setState({value: event.target.value});
	    ReactDOM.render(
	    
		  <Restaurants value={getRestaurantByName(this.state.value)}/>,
		  document.getElementById('root')
		);

 	}
  render(){
  	return (
      <form onSubmit={this.handleSubmit}>
        <label>
        <div class="col-auto">
           <b>Rechercher :   </b>
           </div>
           <div class="col-auto">
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          </div>
        </label>
      </form>
    );
  }
}

class Restaurants extends React.Component{
	render() {
		return(
			<div>
			<div class="container">
  				<div class="row">
   				 <div class="col-auto">
   				 <Checkbox />
      				<div class="row">
   				 <div class="col-auto mr-auto">
      			<Dropdown/>
      				</div>
      				</div>
    			</div>
    			
    		<div class="col-auto">
      			<img src={require('./style/DealToEat.jpg')} class="img-responsive " />
   			 </div>
    		<div class="col-auto">
      			<SearchBar/>
   			 </div>
 			 </div>
			</div>
				
				{this.props.value.map((restaurant)=>{
					return <Restaurant value ={restaurant}/>
					})
				}
			</div>

		)
	}
}

function getStars(resto){
	if (resto.stars== "1 étoile")
		return <img src={require('./style/1etoile.png')} class="img-responsive-stars "/>
	if (resto.stars== "2 étoiles")
		return <img src={require('./style/2etoile.png')} class="img-responsive-stars "/>
	if (resto.stars== "3 étoiles")
		return <img src={require('./style/3etoile.png')} class="img-responsive-stars " />
}

class Restaurant extends React.Component {
	render() {
		return (
			<div class="container">

				<h2>{this.props.value.title}</h2>
				
					<div class="row">
						<div class="col-auto">
							<b>Type de cuisine :</b>
						</div>
						<div class="col-auto">
							{this.props.value.cuisine}
						</div>
					</div>

					<div class="row">
						<div class="col-auto">
							<b>Prix :</b>
						</div>
						<div class="col-auto">
							{this.props.value.price}
						</div>
					</div>

					<div class="row">
						<div class="col-auto">
     						<b>Nombre d'étoiles :</b>
   					 	</div>
						<div class="col-auto">
      			       		{getStars(this.props.value)}
      			       </div>
      				</div>

      				<div class="row">
      					<div class="col-auto">
							<b>Nom du chef :</b> 
						</div>
						<div class="col-auto">
							{this.props.value.chief_name}
						</div>
					</div>

					<div class="row"> 
						<div class="col-auto">
							<IsOfferMichelin value={this.props.value.offers}/>
							{this.props.value.offers.map((offer)=>{
								return <MichelinOffers value={offer}/> 
							})
						}
						</div>
					</div>

					<div class="row">
						<div class="col-auto">
							<IsOfferLaFourchette value={this.props.value.deals_lafourchette}/>
							{this.props.value.deals_lafourchette.map((deal)=>{
								return <DealLaFourchette value ={deal}/>
							})
						}
						</div>
					</div>

					<div class="row">
						<div class="col-auto">
							<b>Adresse :</b>
						</div>
						<div class="col-auto">
							<Restaurantsaddress value = {this.props.value.address}/>
						</div>	
					</div>
				
			</div>
		)
	}
}

ReactDOM.render(
  <Restaurants value={restaurants}/>,
  document.getElementById('root')
);