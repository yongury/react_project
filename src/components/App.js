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


class App extends React.Component {
  static propTypes = {
    initialData: React.PropTypes.object.isRequired
  };
  //set statewith prop data
  state = this.props.initialData;
  componentDidMount() {
    onPopState((event) => {
      //console.log(event.state);
      this.setState({
        currentPropertyId : (event.state || {}).currentPropertyId
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
  fetchPropertyListSearched = (City) => {
    pushState(
      { currentPropertyId: null },
      `/property/${City}`
    );
    api.fetchProperty(City).then(properties => {
      this.setState({
        currentPropertyId: null,
        properties
        }
      });
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
    //console.log("currentProperty() Address :"+this.state.properties[this.state.currentPropertyId].Address);
    return this.state.properties[this.state.currentPropertyId];

  }
  //property title
  pageHeader() {
    if (this.state.currentPropertyId) {
      //console.log("pageHeader() Address : "+this.currentProperty().Address);
      return this.currentProperty().Address;
    }
    //console.log(this.currentProperty().Address);

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


  currentContent() {
    //if propretyId exist
    //call property.js
    //or call propertyList.js
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
    return <PropertyList
            onPropertyClick={this.fetchProperty}
            properties={this.state.properties} />;
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
