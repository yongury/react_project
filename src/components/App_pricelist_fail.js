import React from 'react';
import axios from 'axios';
import Header from './Header';

import PropertyList from './PropertyList';
import Property from './Property';
import * as api from '../api';


//routing
const pushState = (obj, url)=>
  window.history.pushState(obj,'',url);

const onPopState = handler =>{
  window.onpopstate = handler;
}

const cityList = [{
    name: "Vancouver",
    hex: "#F21B1B"
  }, {
    name: "Burnaby",
    hex: "#1B66F2"
  }, {
    name: "All",
    hex: "#07BA16"
  }];

  const priceList = [0,500000,1000000,2000000,5000000];

class App extends React.Component {
  static propTypes = {
    initialData: React.PropTypes.object.isRequired
  };
  //set statewith prop data
  constructor(props) {
      super(props);

      this.state = props.initialData;
  //    console.log("this state initialFilterData :"+this.state.initialFilterData);
      // this.state = {
      //   this.props.initialData,
      //   ListVisible :"false",
      //   display : "",
      //   cityList : cityList,
      //   selected : cityList[0]
      // }
      // this.setState({
      //   ListVisible :"false",
      //   display : "",
      //   cityList : cityList,
      //   selected : cityList[0]
      // });
      this.setList = this.setList.bind(this);
    }

  //state = this.props.initialData;


  componentDidMount() {
    // this.setState({
    //   ListVisible :"false",
    //   display : "",
    //   cityList : cityList,
    //   selected : cityList[0]
    // });
    //console.log(this.state);
    this.setList();
    onPopState((event) => {
      //console.log(event.state);
      this.setState({
        currentPropertyId : (event.state || {}).currentPropertyId,

      });
    });


  }
  componentWillUnmount() {

    onPopState(null);
  }
  //get property data from propertyId
  fetchProperty = (propertyId) => {

    pushState(
      { currentPropertyId: propertyId },
      `/property/${propertyId}`
    );
    api.fetchProperty(propertyId).then(property => {

      this.setState({
        currentPropertyId: property._id,
        properties: {
          ...this.state.properties,
          [property._id]: property
        }
      });
    });
  };
  //get properties by city name
  fetchPropertyListSearched ()  {

    pushState(
      { currentPropertyId: null },
      `/property/${this.state.selected.cityName}`
    );

      if(this.state.selected.cityName=="All"){
        api.fetchPropertyList().then(properties =>{
          this.setState({
            currentPropertyId: null,
            properties
          });
        });
      }
      else{
      api.fetchPropertyListSearched(this.state.selected.cityName).then(properties => {
        this.setState({
          currentPropertyId: null,
          properties
          }
        );
      });
    }
  };
  //get all property data
  fetchPropertyList = () =>{
    pushState(
      {currentPropertyId : null},
      `/`
    );
    api.fetchPropertyList().then(properties =>{
      this.setState({
        currentPropertyId: null,
        properties
      });
    });
  }
  //get notes of all noteIds
  fetchNotes = (noteIds) =>{
    if(noteIds.length === 0){
      return;
    }
    api.fetchNotes(noteIds).then(notes => {
      this.setState({
        notes
      });
    });
  }

  currentProperty() {

    return this.state.properties[this.state.currentPropertyId];

  }
  //property title
  pageHeader() {
    if (this.state.currentPropertyId) {

      return this.currentProperty().Address;
    }


    //if not a single property return "Property List"
    return 'Property List';
  }
  //find Notes
  lookupNote = (noteId)=>{
    //if noteId doesn't exist or no data stored in state.notes
    //return fake note data as "..."
    if(!this.state.notes || !this.state.notes[noteId]){
      return {
        note: '...'
      }
    }
    return this.state.notes[noteId];
  };
  // create new note
  addNote = (newNote, propertyId) =>{
    api.addNote(newNote, propertyId).then(resp =>{
      this.setState({
        properties: {
          ...this.state.properties,
          [resp.updatedProperty._id]: resp.updatedProperty
        },
        notes: {
          ...this.state.notes,
          [resp.newNote._id]: resp.newNote
        }
      })
    }
    ).catch(console.error);
  };
//update property data
  editProperty = (newPrice,
                  newRoom,
                  newAddress,
                  newCity,
                  newprovince,
                  newpostalCode,
                  propertyId) =>{
    api.editProperty(newPrice,
                    newRoom,
                    newAddress,
                    newCity,
                    newprovince,
                    newpostalCode, propertyId).then(resp =>
      this.setState({
        properties: {
          //...resp.updatedProperty,
          ...this.state.properties,
          [resp.updatedProperty._id]: resp.updatedProperty
      }
      })
    ).catch(console.error);
  }

  select =(item)=> {
      if(item.listyType==0){
					this.state.selected.cityName = item.name;
          this.fetchPropertyListSearched();
      }
      else if(item.listType ==1){
        this.state.selected.minPrice = item.price;
        this.fetchPropertyListSearched();
      }
      else{
        this.state.selected.maxPrice = item.price;
        this.fetchPropertyListSearched();
      }
      //    console.log("item"+item);

	};

	show = (listType) => {
    if(listType == 0)
		  this.setState({ listVisibleCity: true });
    else if(listType == 2 )
      this.setState({ listVisibleMinPrice: true });
    else
      this.setState({ listVisibleMaxPrice: true });
		document.addEventListener("click", this.hide);
	};

	hide = () => {
		this.setState({ listVisibleCity: false,
                    listVisibleMaxPrice: false,
                    listVisibleMaxPrice: false
                    });
		document.removeEventListener("click", this.hide);
	};
  setList () {
    this.setState((preState) =>({
    //  ...preState,
      ListVisibleCity :"false",
      ListVisibleMinPrice :"false",
      ListVisibleMaxPrice :"false",
      display : "",
    //  cityList : cityList,
      selected : this.state.initialFilterData
    }));
  };
  updatedCity = () =>{
  //  console.log(this.state.selected.name);
  }
  renderListItems (listType) {

    			var items = [];
         if(listType == 0){
   					for (var i = 0; i < cityList.length; i++) {
   						var item = {};
              item["name"] = cityList[i].name;
              item["hex"] = cityList[i].hex;
              item["listType"] = 0;
        //     console.log("item :"+item.hex +" "+ item.name);
   						items.push(<div key = {item.name} onClick={this.select.bind(null, item)}>
   							<span style={{ color: item.hex }}>{item.name}</span>
   							<i className="fa fa-check"></i>
   						</div>);
   					}

			      return items;
         }
          else {
          priceList.map(price =>{
            var item={};
            item["price"] = price;
            item["listType"] = listType;
            items.push(<div key={price} onClick={this.select.bind(null, item)}>
 							<span>{price}</span>
 							<i className="fa fa-check"></i>
 						</div>)
          });
          return items;
        }
	}

  currentContent() {


    if (this.state.currentPropertyId) {
      return <Property
              propertyListClick ={this.fetchPropertyList}
              fetchNotes={this.fetchNotes}
              lookupNote = {this.lookupNote}
              addNote={this.addNote}
              {...this.currentProperty()}
              editProperty = {this.editProperty}
               />;
    }
    //call propertyList with properties (state data)
    //call fetchProperty if onPropertyClick event happens

  //   <div className={"dropdown-container" + (this.state.listVisibleMinPrice ? " show" : "")}>
  //       <div className={"dropdown-display" + (this.state.listVisibleMinPrice ? " clicked": "")} onClick={this.show(1)} >
  //            <span>{this.state.selected.minPrice}</span>
  //                 <i className="fa fa-angle-down">&#9660;</i>
  //       </div>
  //       <div className="dropdown-list">
  //          <div>
  //           {this.renderListItems(1)}
  //           </div>
  //       </div>
  //  </div>
  //  <div className={"dropdown-container" + (this.state.listVisibleMaxPrice ? " show" : "")}>
  //      <div className={"dropdown-display" + (this.state.listVisibleMaxPrice ? " clicked": "")} onClick={this.show(2)} >
  //           <span>{this.state.selected.maxPrice}</span>
  //                <i className="fa fa-angle-down">&#9660;</i>
  //      </div>
  //      <div className="dropdown-list">
  //         <div>
  //          {this.renderListItems(2)}
  //          </div>
  //      </div>
  // </div>

    let CityName = this.state.properties[Object.keys(this.state.properties)[0]].City;


    return <div>
              <div className={"dropdown-container" + (this.state.listVisibleCity ? " show" : "")}>
					        <div className={"dropdown-display" + (this.state.listVisibleCity ? " clicked": "")} onClick={this.show(0)} >
						           <span>{this.state.selected.cityName}</span>
						                <i className="fa fa-angle-down">&#9660;</i>
                  </div>
			            <div className="dropdown-list">
					           <div>
                      {this.renderListItems(0)}
			                </div>
                  </div>
             </div>

             <br/>
             <br/>
             <div>
              <PropertyList
              onPropertyClick={this.fetchProperty}
              properties={this.state.properties} />
              </div>
           </div>;
  }
  render() {
    return (
      <div className="App">


        <Header message={this.pageHeader()} />


        {this.currentContent()}
      </div>
    );
  }
}

export default App;
