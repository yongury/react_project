import React from 'react';
import PropertyPreview from './PropertyPreview';

//call PropertyPreview with each popertyId of propertyies
const PropertyList = ({properties, onPropertyClick})=>(
  <div className = "PropertyList">
    {Object.keys(properties).map(propertyId =>
      <PropertyPreview
        key ={propertyId}
        onClick = {onPropertyClick}
       {...properties[propertyId]} />
    )}
  </div>
);

PropertyList.propTypes ={
  properties:React.PropTypes.object,
  onPropertyClick : React.PropTypes.func.isRequired
};

export default PropertyList;
