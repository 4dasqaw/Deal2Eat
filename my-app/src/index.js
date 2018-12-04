import './style/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Pagination from'./pagination.js'
import restaurants from  './Liste-restaurants_lafourchette';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button} from 'reactstrap';

var accents = require('remove-accents');

var isfilteredByCuisine =false;
var isfilteredBystars =false;

var filter ={'OneStar':false,'TwoStars':false,'ThreeStars':false,'Cuisine':'','City':''};

function filterAll(){
	var filteredRestos = [];
	if(isfilteredBystars==true && isfilteredByCuisine==false){
		filteredRestos=getRestaurantByStars(filter.OneStar,filter.TwoStars,filter.ThreeStars);
	}
	if(isfilteredBystars==false && isfilteredByCuisine==true){
		filteredRestos=filterRestaurant(filter.Cuisine);
	}
	if(isfilteredBystars==true && isfilteredByCuisine==true){
		var tabint1=[];
		tabint1=getRestaurantByStars(filter.OneStar,filter.TwoStars,filter.ThreeStars);
		var tabint2 = [];
		tabint2=filterRestaurant(filter.Cuisine);
		
		filteredRestos=keepSames(tabint1,tabint2);
		
	}
	if (isfilteredByCuisine==false && isfilteredBystars==false)
		filteredRestos=restaurants;

	console.log(isfilteredByCuisine);
	return filteredRestos;
}

function keepSames(array1,array2) {
	var out = [];
  for(var i = 0;i<array1.length;i++){
  	for (var j =0;j<array2.length;j++){
  		if(array2[j]==array1[i])
  			out.push(array2[j]);
  	}
  }
  return out;
}

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
	    this.handleClick = this.handleClick.bind(this);
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
		handleClick(event){
			isfilteredBystars=true;
			filter.OneStar=this.state.checked;
			filter.TwoStars=this.state.checked2;
			filter.ThreeStars=this.state.checked3;
			
			 ReactDOM.render(
			    <Restaurants value={filterAll()}/>,
				  document.getElementById('root')
				);
			 event.preventDefault();
		}
	  render() {
	    const togglecheck1 = !this.state.checked ? 'hidden-check1' : '';
	    const togglecheck2 = !this.state.checked2 ? 'hidden-check2' : '';
	    const togglecheck3 = !this.state.checked3 ? 'hidden-check3' : '';

	    return(
	    	
		        <div class="container">
		        <div class="row">
		        	<div class="col-auto no-gutters">
			        	<label>1 Etoile</label>
			        </div>
			    
			        <div class="col-auto no-gutters">
			        	<input type="checkbox" id="chk1"className="chk11" checked={ this.state.checked } onChange={ this.handleChange } />
			        </div>
			    </div>
			    <div class="row">
			        <div class="col-auto no-gutters">
			        	<label>2 Etoiles</label>
			        </div>
			        <div class="col-auto no-gutters">
			        	<input type="checkbox" id="chk2" className="chk22" checked={ this.state.checked2 } onChange={ this.handleChange2 } />
			        </div>
			        <div class="col-auto no-gutters">
			        	<Button onClick={this.handleClick}  color="primary">Search</Button>
			     	</div>
			     </div>
			     
			     <div class = "row">
			        <div class="col-auto no-gutters">
			        	<label>3 Etoiles</label>
			        </div>
			        <div class="col-auto no-gutters">
			        	<input type="checkbox" id="chk3" className="chk33" checked={ this.state.checked3 } onChange={ this.handleChange3 } />
			        </div>
			    </div>
	        		
		      	

		      	</div>
	    );
	  }
}



class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
     this.handleClick = this.handleClick.bind(this);
    this.state = {
      dropdownOpen: false,
      value : "Tous les Types"
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  handleClick(event) {
  	 this.setState({
      value: event.target.innerText
    });
  	 isfilteredByCuisine=true;
  	 filter.Cuisine=event.target.innerText;
  	 ReactDOM.render(
			    <Restaurants value={filterAll()}/>,
				  document.getElementById('root')
				);
			 event.preventDefault();
		}

  render() {
    return (
    	<div>
    	 <b>Type De Cuisine:   </b>

      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret color="primary">
          {this.state.value}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={this.handleClick}>Végétarien</DropdownItem>
          <DropdownItem onClick={this.handleClick}>Gastronomique</DropdownItem>
          <DropdownItem onClick={this.handleClick}>Classique</DropdownItem>
          <DropdownItem onClick={this.handleClick}>Traditionnel</DropdownItem>
          <DropdownItem onClick={this.handleClick}>Moderne</DropdownItem>
          <DropdownItem onClick={this.handleClick}>Créative</DropdownItem>
          <DropdownItem onClick={this.handleClick}>Végétalien</DropdownItem>
          <DropdownItem onClick={this.handleClick}>Provençal</DropdownItem>
          <DropdownItem onClick={this.handleClick}>Tous Les Types</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
      </div>
    );
  }
}

function filterRestaurant(type){
	var tab=[];
	if(type==="Tous Les Types")
		return restaurants;

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

function getRestaurantByAdress(city){
	var tab=[];
	restaurants.map((restaurant)=>{
		if(aContainsB(accents.remove(restaurant.address.locality).toLowerCase(),accents.remove(city).toLowerCase()))
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

	    this.state = {value1: '', dropdownOpen: false, value2:''
      };
	    this.handleChange = this.handleChange.bind(this);
    this.handleClick=this.handleClick.bind(this);
     this.toggle = this.toggle.bind(this);
    };
  	
  	toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

	handleClick(event) {
  	 this.setState({
  	 	value1:event.target.innerText
  	 });
  	
	}
	handleChange(event) {
	    this.setState({value2: event.target.value});
	    if(this.state.value1==="Ville"){
	    	 ReactDOM.render(
	    
		  <Restaurants value={getRestaurantByAdress(this.state.value2)}/>,
		  document.getElementById('root')
		);
	    }
	    if(this.state.value1==="Nom")
	    {
	    	 ReactDOM.render(
	    
		  <Restaurants value={getRestaurantByName(this.state.value2)}/>,
		  document.getElementById('root')
		);
	    }
	   

 	}
  render(){
  	return (
      <form onSubmit={this.handleSubmit}>
        <div class="col-auto">
           <b>Rechercher Par:   </b>
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        		<DropdownToggle caret color="primary">
          			{this.state.value1}
       		 </DropdownToggle>
       		 <DropdownMenu>
       		 <DropdownItem onClick={this.handleClick}>Ville</DropdownItem>
          	<DropdownItem onClick={this.handleClick}>Nom</DropdownItem>
          	</DropdownMenu>
        	</ButtonDropdown>
           </div>
           <div class="col-auto">
          <input type="text" value={this.state.value2} onChange={this.handleChange} />
          </div>
      </form>
    );
  }
}

class Restaurants extends React.Component{
	render() {
		return(
			<div>
			<div class="header">
			<div class="container">
				<div class="col-sm">
				<img src={require('./style/DealToEat.jpg')} class="img-responsive " />
				</div>
	  				<div class="row">
	   				 <div class="col-sm">
	   				 <Dropdown/>
	    			</div>
	    			
	    		<div class="col-sm">
	      			 <SearchBar/>
	   			 </div>
	    		<div class="col-sm">

	      			<Checkbox />
	   			 </div>
	 			 </div>
			</div>
			</div>
			<div>
				{this.props.value.map((restaurant)=>{
					return <Restaurant value ={restaurant}/>
					})
				}
			</div>
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
			<br></br><br></br>
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

					<div class="row align-items-center">
						<div class="col-auto">
     						<b>Nombre d'étoiles :</b>
   					 	</div>
						<div class="col-auto">
      			       		{getStars(this.props.value)}
      			       </div>
      				</div>
      				<div class="row">
						<div class="col-auto">
     						<b>Note Clients :</b>
   					 	</div>
						<div class="col-auto">
      			       		{this.props.value.AvisClient}
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
			}
				
			</div>
		)
	}
}
ReactDOM.render(
  <Restaurants value={filterAll()}/>,
  document.getElementById('root')
);