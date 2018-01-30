import React from 'react';
import axios from 'axios';
import Header from './Header';

import PropertyList from './PropertyList';
import Property from './Property';
import Filters from './Filters';
import * as api from '../api';
// import window from 'global';


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

const priceList = [0,500000,1000000,2000000,5000000,10000000];


class App extends React.Component {
  static propTypes = {
    initialData: React.PropTypes.object.isRequired
  };
  //set state with prop data
  constructor(props) {
      super(props);

      this.state = props.initialData;

      this.setList = this.setList.bind(this);
      // this.show = this.show.bind(this);
      // this.renderListItems = this.renderListItems.bind(this);
       this.renderListItemsFilter = this.renderListItemsFilter.bind(this);
       this.showFilter = this.showFilter.bind(this);
    }


  componentDidMount() {
    //update state
    this.setList();
    onPopState((event) => {

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
  //get filtered properties
  fetchPropertyListSearched ()  {

    let query=Object.values(this.state.initialFilterData);

    query = query.toString();
  //  console.log("query :"+query);

    pushState(
      { currentPropertyId: null },
      // `/property/${this.state.initialFilterData.cityNam}`
       `/property/${query}`
    );

    api.fetchPropertyListSearched(query).then(properties => {
      this.setState({
        currentPropertyId: null,
        properties
        }
      );
    });


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
//select new filter from drop down menu
  select =(item)=> {

        if(item.listType==0)
          this.state.initialFilterData.cityName = item.cityName;
        else if(item.listType==1)
          this.state.initialFilterData.minPrice = item.minPrice;
        else
          this.state.initialFilterData.maxPrice = item.maxPrice;

        this.fetchPropertyListSearched();


	};
//filter drop down list show


  showFilter = (listTypeFilter)=> {
    if(listTypeFilter==0){
      this.setState({ listVisible:
                              {City:true,
                              MinPrice:false,
                              MaxPrice:false
                            }
       });

    }
    else if(listTypeFilter ==1)
    this.setState({ listVisible:
                            {City:false,
                             MinPrice:true,
                             MaxPrice:false
                           }
     });
    else if(listTypeFilter ==2)
    this.setState({ listVisible:
                            {City:false,
                             MinPrice:false,
                             MaxPrice:true}
     });

    document.addEventListener("click", this.hide);
  };
	hide = () => {
		this.setState({
                    listVisible:
                      {City:false,
                      MinPrice:false,
                      MaxPrice:false
                    }

     });
		document.removeEventListener("click", this.hide);
	};

  setList () {
    this.setState((preState) =>({

      display : "",

      selected : this.state.initialFilterData.cityName
    }));

  };


  //generate list of each filter
  renderListItemsFilter =(listTypeFilter) =>{

    //console.log(typeof(listTypeFilter));
    var items = [];

        if(listTypeFilter == 0){
 					for (var i = 0; i < cityList.length; i++) {
             let item={} ;
             item["cityName"] = cityList[i].name;
             item["hex"] = cityList[i].hex;
             item["listType"] = 0;

                items.push(<div onClick={this.select.bind(null, item)} key = {item.cityName}>
     							<span style={{ color: item.hex }} >{item.cityName}</span>
     							<i className="fa fa-check"></i>
     						</div>);
 					}
          return items;

        }
        else if(listTypeFilter == 1 ){
          for (var i = 0; i < priceList.length; i++) {
             let item={};
             item["minPrice"] = priceList[i];
             item["listType"] = 1;

              	items.push(<div onClick={this.select.bind(null, item)} key ={item.minPrice}>
   							<span >{item.minPrice}</span>
   							<i className="fa fa-check"></i>
   					  	</div>);
 					}
          return items;
        }
        else{
          for (var i = 0; i < priceList.length; i++) {
             let item={};
             item["maxPrice"] = priceList[i];
             item["listType"] = 2;

            		items.push(<div onClick={this.select.bind(null, item)} key={item.maxPrice}>
     							<span >{item.maxPrice}</span>
     							<i className="fa fa-check"></i>
     						  </div>);
 					}
          return items;
        }


	}

  currentContent() {

    //if propretyId exist
    //call property.js
    //or call propertyList.js and Filter.js
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

    return <div>
             <Filters
               listVisibleCity = {this.state.listVisible.City}
               initialFilterData = {this.state.initialFilterData}
               listVisibleMinPrice = {this.state.listVisible.MinPrice}
               listVisibleMaxPrice = {this.state.listVisible.MaxPrice}
               showFilter = {this.showFilter}
               renderListItemsFilter = {this.renderListItemsFilter}
             />
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
