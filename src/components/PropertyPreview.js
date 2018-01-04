import React ,{Component} from 'react';

class PropertyPreview extends Component {

//if click event happens
//call handleClick func
  handleClick = () =>{
    //console.log(this.props.City);
    this.props.onClick(this.props._id);
      //<img src={require('../../public/img/'+this.props.image[0])} className = "house-image"/>

  }
  render() {
    return(
      <div className="link PropertyPreview" onClick={this.handleClick}>
      <table>
        <tbody>
          <tr>
            <td>
              <img src={this.props.images[0]} className="house-image"/>
            </td>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </td>
            <td>
              <div className="property-address">
                {this.props.Address} {this.props.City}
              </div>
              <div className = "property-name">
                Price : {this.props.price}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    )
  }
}

PropertyPreview.propTypes = {
  _id : React.PropTypes.string.isRequired,
  Address: React.PropTypes.string.isRequired,
  City: React.PropTypes.string.isRequired,
  images: React.PropTypes.array.isRequired,
  onClick : React.PropTypes.func.isRequired
}

export default PropertyPreview;
