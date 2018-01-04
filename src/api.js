import axios from 'axios';

//ajax get method
//receive property data by propertyId
export const fetchProperty = propertyId => {
  return axios.get(`/api/properties/${propertyId}`)
              .then(resp => resp.data);
};
//ajax get method
//receive all property data
export const fetchPropertyList =()=> {
  return axios.get('/api/properties')
              .then(resp => resp.data.properties);
}
//ajax get method
//receive all note data
export const fetchNotes = noteIds => {
  return axios.get(`/api/notes/${noteIds.join(',')}`)
              .then(resp => resp.data.notes);
}
//ajax post method
//create new note and add to the property
export const addNote = (newNote, propertyId) =>{
  return axios.post('/api/notes',{newNote, propertyId})
              .then(resp => resp.data);
}
//ajax post method
//update property ob propertyId
export const editProperty = (newPrice,
                            newRoom,
                            newAddress,
                            newCity,
                            newprovince,
                            newpostalCode,
                            propertyId) =>{
  return axios.post('/api/property',{newPrice,
                  newRoom,
                  newAddress,
                  newCity,
                  newprovince,
                  newpostalCode,
                  propertyId})
              .then(resp => resp.data);
}
/*
export const fetchProperty = propertyId => {
  return axios.get(`/api/properties/${propertyId}`)
              .then(resp => resp.data);
}
*/
