import React, { Component, PropTypes } from 'react';

class Property extends Component {
  //slides

    constructor(props) {
      super(props);
      this.state = { /* initial state */
        operator:"PLUS",
        pointer:0
      };
    }


  componentDidMount() {
    this.props.fetchNotes(this.props.noteIds);
    var self = this;
    //slide show
    //every 5 secs swhitch the image
    this.interval = setInterval(()=>{
      var pointer = self.state.pointer;
      var operator = self.state.operator;
      if(pointer===this.props.images.length-1){operator = "MINUS"}
      else if (pointer <= 0){operator ="PLUS"}
      operator === "PLUS"? pointer++ : pointer--;
      return self.setState({pointer:pointer,
                            operator:operator
                          })
    },5000)

      //set property current data
      this.refs.newPriceInput.value= this.props.price;
      this.refs.newRoomInput.value= this.props.Room;
      this.refs.newAddressInput.value = this.props.Address;
      this.refs.newCityInput.value = this.props.City;
      this.refs.newprovinceInput.value = this.props.province;
      this.refs.newpostalCodeInput.value = this.props.postalCode;



  }
  switchOperator (operator){
    this.setState({operator:operator})
  }
  //edit note
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addNote(this.refs.newNoteInput.value, this.props._id);
    this.refs.newNoteInput.value = '';
  }
  //edit property
  editSubmit = (event) => {
    event.preventDefault();
    //console.log("property -props.category Note : "+this.props.Address);
    //console.log("property - newAddressInput : "+this.refs.newAddressInput.value);
    this.props.editProperty(this.refs.newPriceInput.value,
                            this.refs.newRoomInput.value,
                            this.refs.newAddressInput.value,
                            this.refs.newCityInput.value,
                            this.refs.newprovinceInput.value,
                            this.refs.newpostalCodeInput.value,
                            this.props._id);

  }

/*
  {this.props.images.map(image =>
    <img key = {image} src={require('../../public/img/'+image)} className = "house-image"/>
  )}
  */
  render() {
      //let image_source = this.props.images[this.state.pointer];
    //console.log(image_source);
    return (
      <div className="Property">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Property Description</h3>
          </div>
          <div className = "slide_show">
            <img src={this.props.images[this.state.pointer]} className="house-image-slide" />
          </div>
          <div className="panel-body">
            <div className="property-description">
              <table>
                <tbody>
                  <tr>
                    <td>

                    </td>
                    <td>&nbsp;&nbsp;&nbsp;&nbsp;
                    </td>
                    <td>
                      address: {this.props.Address} {this.props.City} {this.props.province},
                      {this.props.postalCode}
                      <br/>
                      Room : {this.props.Room}  Bathroom : {this.props.Bathroom}
                      <br/>
                      Registered Date : {this.props.registeredDate}
                      <br/>
                      price : {this.props.price}
                      <br/>
                      {this.props.description}
                      <br/>
                    </td>
                  </tr>
                </tbody>
               </table>
            </div>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Added Note</h3>
          </div>
          <div className="panel-body">
            <ul className="list-group">
              {this.props.noteIds.map(noteId =>
                <li key={noteId} className="list-group-item">
                {this.props.lookupNote(noteId).note}</li>
              )}


            </ul>
          </div>
        </div>

        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">New Note</h3>
          </div>
          <div className="panel-body">
            <form onSubmit ={this.handleSubmit}>
              <div className="input-group">
                <input type="text"
                  placeholder="New Note Here..."
                  ref = "newNoteInput"
                  className="form-control" />
                <span className="input-group-btn">
                  <button type="submit" className="btn btn-info">Sumbit</button>
                </span>
              </div>
            </form>
          </div>
        </div>



        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">Edit Property</h3>
          </div>
          <div className="panel-body">
            <form onSubmit ={this.editSubmit} className = "form-horizontal" >
              <div className="input-group">
                <div>
                  <label className="control-label"> Price  </label>
                  <input type="text"
                    placeholder={this.props.price}
                    ref = "newPriceInput"
                    className="form-control" /> ( put new price )
                </div>
                <div>
                  <label> Room  </label>
                  <input type="text"
                    placeholder={this.props.Room}
                    ref = "newRoomInput"
                    className="form-control" />( put the number of rooms )
                </div>
                <div> <label> Address </label>
                <div>
                   Street address
                  <input type="text"
                    placeholder={this.props.Address}
                    ref = "newAddressInput"
                    className="form-control"  />( put Street address, P.O. box )
                </div>
                <div>
                   City/Town
                  <input type="text"
                    placeholder={this.props.City}
                    ref = "newCityInput"
                    className="form-control" />
                </div>
                <div>
                   Province
                  <input type="text"
                    placeholder={this.props.province}
                    ref = "newprovinceInput"
                    className="form-control"  />
                </div>
                <div>
                   Postal Code
                  <input type="text"
                    placeholder={this.props.postalCode}
                    ref = "newpostalCodeInput"
                    className="form-control"  />
                </div>
              </div>
              </div>
                <span className="input-group-btn">
                  <button type="submit" className="btn btn-info">Edit</button>
                </span>
            </form>
          </div>
        </div>
        <div className="home-link link"
             onClick={this.props.propertyListClick}>
          Property List
        </div>
      </div>
    );
  }
}

Property.propTypes = {
  _id : PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  propertyListClick: PropTypes.func.isRequired,
  fetchNotes: PropTypes.func.isRequired,
  noteIds : PropTypes.array.isRequired,
  lookupNote : PropTypes.func.isRequired,
  addNote : PropTypes.func.isRequired,
  editProperty: PropTypes.func.isRequired,
  Address : PropTypes.string.isRequired
};

export default Property;
