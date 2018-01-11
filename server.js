import config from './config';
import apiRouter from './api';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';

import express from 'express';
import bodyParser from 'body-parser';

const server = express();
server.use(bodyParser.json());

server.use(sassMiddleware({
  src:path.join(__dirname, 'sass'),
  dest:path.join(__dirname, 'public')
}));

server.set('view engine','ejs');
import serverRender from './serverRender';


//call serverRender with propertyId from parameters
server.get(['/property', '/property/:propertyId'], (req, res) => {
  serverRender(req.params.propertyId)
    .then(({ initialMarkup, initialData }) => {
      res.render('index', {
        initialMarkup,
        initialData
      });
    })
    .catch(error=>{
      console.error(error);
      res.status(404).send('Bad Request');
    });
});
// server.get('/property/:City', (req, res) => {
//   serverRender(req.params.City)
//     .then(({ initialMarkup, initialData }) => {
//       res.render('index', {
//         initialMarkup,
//         initialData
//       });
//     })
//     .catch(error=>{
//       console.error(error);
//       res.status(404).send('Bad Request');
//     });
// });
server.get('/', (req, res) => {
  res.render('main')


});
/*
server.get(['/','/property/:propertyId'], (req, res) => {
  //console.log(req.params.propertyId);
  serverRender(req.params.propertyId)
    .then(({ initialMarkup, initialData }) => {
      res.render('index', {
        initialMarkup,
        initialData
      });
    })
    .catch(console.error);
});
*/
// server.get('/',(req,res)=> {
//   serverRender()
//     .then(({initialMarkup, initialData}) => {
//       res.render('index', {
//         initialMarkup,
//         initialData
//       });
//     })
//     .catch(console.error);
// //  res.render('index', {
//   //  content:'...'
//   //});
// });

server.use('/api',apiRouter);
server.use(express.static('public'));

server.listen(config.port,config.host, () =>{
  console.info ('Express listening on port ',config.port)
});
