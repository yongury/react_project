import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from './src/components/App';

import config from './config';
import axios from 'axios';

const City = ["All","Vancouver","Burnaby"];
var initialFilterData={};
var listVisible={};

const getApiUrl = propertyId => {
  //if propertyId exists
  //return api url with property Id

  if (propertyId) {
  //  if(propertyId == "Vancouver" || "Burnaby")
    if(City.indexOf(propertyId) != -1)
      return `${config.serverUrl}/api/searchedProperties/${propertyId}`;

    return `${config.serverUrl}/api/properties/${propertyId}`;
  }
  //if propertyId doesn't exist
  //return url all property ids
  return `${config.serverUrl}/api/properties`;
};
//store data with propertyId and apiData
const getInitialData = (propertyId, apiData) => {
  listVisible["City"]=false;
  listVisible["MinPrice"]=false;
  listVisible["MaxPrice"]=false;
  //if propertyId exists
  //apiData is a single property data
  if (propertyId) {
    //if(propertyId == "Vancouver" || "Burnaby")
    if(City.indexOf(propertyId) != -1){
      initialFilterData["cityName"]=propertyId;
      initialFilterData["minPrice"]=0;
      initialFilterData["maxPrice"]=10000000;
      // listVisible["City"]="false";

      //console.log(initialFilterData);
      return {
        properties: apiData.properties,
        initialFilterData:initialFilterData,
        listVisible:listVisible
      }
    }
    return {
      currentPropertyId: apiData._id,
      properties: {
        [apiData._id]: apiData
      }
    };
  }
  initialFilterData["cityName"]="All";
  initialFilterData["minPrice"]=0;
  initialFilterData["maxPrice"]=10000000;

//  console.log("serverrender-initialfileter :"+initialFilterData);
  //if propertyId doesn't exist
  //apiData has all property data
  return {
    properties: apiData.properties,
    initialFilterData: initialFilterData,
    listVisible: listVisible
  };
};

const serverRender = (propertyId) =>
//ajax get method
  axios.get(getApiUrl(propertyId))
    .then(resp => {
    //  console.log("description!!");
    //  console.log(resp.data.description);

    //initialize with resp data through ajax
      const initialData = getInitialData(propertyId, resp.data);
      //call App.js with prop variable of initialData
      //set initialMarkup in index.ejs
      //serveer side rendering
      return {
        initialMarkup: ReactDOMServer.renderToString(
          <App initialData={initialData} />
        ),
        initialData
      };
    });

export default serverRender;

/*
const getApiUrl = propertyId =>{
  if(propertyId){
    return `${config.serverUrl}/api/properties/${propertyId}`;
  }
  return `${config.serverUrl}/api/properties`;
}

const getInitialData = (propertyId,apiData) =>{
  if(propertyId){
    return {
      currentPropertyId : apiData.id,
      properties: {
        [apiData.id]: apiData
      }
    };
  }
  return {
    properties:apiData.properties
  };
}

const serverRender = (propertyId) =>
  axios.get(getApiUrl(propertyId))
    .then(resp => {
      const initialData = getInitialData(propertyId,resp.data)
      return {
        initialMarkup: ReactDOMServer.renderToString(
          <App initialData={initialData} />
        ),
        initialData
      };
    });

export default serverRender;
*/
// import React from 'react';
// import ReactDOMServer from 'react-dom/server';
//
// import App from './src/components/App';
//
// import config from './config';
// import axios from 'axios';
//
// const serverRender = ()=>
//   axios.get(`${config.serverUrl}/api/properties`)
//     .then(resp=>{
//       //console.log(resp.data);
//       return {
//         initialMarkup: ReactDOMServer.renderToString(
//         <App initialPropertys={resp.data.properties}/>
//       ),
//       initialData: resp.data
//     };
//   })
//     .catch(console.error);
//
// export default serverRender;
