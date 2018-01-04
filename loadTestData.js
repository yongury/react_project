import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from './config';

MongoClient.connect(config.mongodbUri, (err, db) => {
  assert.equal(null, err);

  db.collection('properties').insertMany([
    { id: 1, Address: '1111 Robson st', City: 'Vancouver', province : 'BC', postalCode: 'V6G1E2',
      price: '1,000,000,000', Room: 4, Bathroom: 2, registeredDate: '01Jan2017', sold:'false', soldDate:'',
      images:['https://images.unsplash.com/photo-1430285561322-7808604715df?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop=',
              'https://images.unsplash.com/photo-1434082033009-b81d41d32e1c?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop=',
              'https://images.unsplash.com/photo-1475855581690-80accde3ae2b?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop=',
              'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?dpr=1&auto=compress,format&fit=crop&w=753&h=&q=80&cs=tinysrgb&crop='
              ],
      description: ` Reasonable price `,
      noteIds: [101, 102] },
    { id: 2, Address: '1215 Robson st', City: 'Vancouver', province : 'BC', postalCode: 'V6G1E3',
      price: '1,200,000,000', Room: 4, Bathroom: 2, registeredDate: '01Feb2017', sold:'false', soldDate:'',
      images:['https://images.unsplash.com/photo-1434082033009-b81d41d32e1c?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop=',
              'https://images.unsplash.com/photo-1475855581690-80accde3ae2b?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop=',
              'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?dpr=1&auto=compress,format&fit=crop&w=753&h=&q=80&cs=tinysrgb&crop=',
              'https://images.unsplash.com/photo-1430285561322-7808604715df?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop='
              ],
      description: `Too expensive
      `,
      noteIds: [] },
    { id: 3, Address: '1333 Granville st', City: 'Vancouver', province : 'BC', postalCode: 'V6V1E3',
      price: '1,500,000,000', Room: 5, Bathroom: 3, registeredDate: '01Mar2017', sold:'false', soldDate:'',
      images:['https://images.unsplash.com/photo-1475855581690-80accde3ae2b?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop=',
              'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?dpr=1&auto=compress,format&fit=crop&w=753&h=&q=80&cs=tinysrgb&crop=',
              'https://images.unsplash.com/photo-1430285561322-7808604715df?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop=',
              'https://images.unsplash.com/photo-1434082033009-b81d41d32e1c?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop='
              ],
    description: `This house is awesome `,
      noteIds: [103, 104, 105] },
    { id: 4, Address: '2255 Burrard st', City: 'Vancouver', province : 'BC', postalCode: 'V6K2E3',
      price: '1,100,000,000', Room: 3, Bathroom: 2, registeredDate: '01May2017', sold:'false', soldDate:'',
      images:['https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?dpr=1&auto=compress,format&fit=crop&w=753&h=&q=80&cs=tinysrgb&crop=',
              'https://images.unsplash.com/photo-1430285561322-7808604715df?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop=',
              'https://images.unsplash.com/photo-1434082033009-b81d41d32e1c?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop=',
              'https://images.unsplash.com/photo-1475855581690-80accde3ae2b?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop='
              ],
    description: `Why so expensive`,
      noteIds: [] },
      { id: 5, Address: '3333 Davie st', City: 'Vancouver', province : 'BC', postalCode: 'V6Z2X3',
        price: '500,000,000', Room: 2, Bathroom: 2, registeredDate: '01June2017', sold:'false', soldDate:'',
        images:['https://images.unsplash.com/photo-1494526585095-c41746248156?w=750',
                'https://images.unsplash.com/photo-1430285561322-7808604715df?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop=',
                'https://images.unsplash.com/photo-1434082033009-b81d41d32e1c?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop=',
                'https://images.unsplash.com/photo-1475855581690-80accde3ae2b?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop='
                ],
    description: `Perfect House`,
      noteIds: [103,105] },
      { id: 7, Address: '1818 W.Gerogia st', City: 'Vancouver', province : 'BC', postalCode: 'V6O2Z1',
        price: '800,000,000', Room: 3, Bathroom: 2, registeredDate: '01July2017', sold:'false', soldDate:'',
        images:['https://images.unsplash.com/photo-1449844908441-8829872d2607?w=750',
                'https://images.unsplash.com/photo-1430285561322-7808604715df?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop=',
                'https://images.unsplash.com/photo-1494526585095-c41746248156?w=750',
                'https://images.unsplash.com/photo-1475855581690-80accde3ae2b?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop='
                ],
    description: `Town House`,
      noteIds: [101,105] },
      { id: 8, Address: '2000 W.Pender st', City: 'Vancouver', province : 'BC', postalCode: 'V6X2Z5',
        price: '950,000,000', Room: 3, Bathroom: 1, registeredDate: '01August2017', sold:'false', soldDate:'',
        images:['https://images.unsplash.com/photo-1464146072230-91cabc968266?w=750',
                'https://images.unsplash.com/photo-1430285561322-7808604715df?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop=',
                'https://images.unsplash.com/photo-1494526585095-c41746248156?w=750',
                'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=750'
                ],
    description: `Beautiful House`,
      noteIds: [102,104] },
      { id: 9, Address: '4429 Kingsway', City: 'Burnaby', province : 'BC', postalCode: 'V5H1A2',
        price: '1,000,000,000', Room: 4, Bathroom: 2, registeredDate: '01Jan2017', sold:'false', soldDate:'',
        images:['https://images.unsplash.com/photo-1430285561322-7808604715df?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop=',
                'https://images.unsplash.com/photo-1434082033009-b81d41d32e1c?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop=',
                'https://images.unsplash.com/photo-1475855581690-80accde3ae2b?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop=',
                'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?dpr=1&auto=compress,format&fit=crop&w=753&h=&q=80&cs=tinysrgb&crop='
                ],
      description: ` Reasonable price `,
      noteIds: [101, 102] },
      { id: 10, Address: '5521 Willingdon Ave', City: 'Burnaby', province : 'BC', postalCode: 'V5H2T3',
        price: '1,200,000,000', Room: 4, Bathroom: 2, registeredDate: '01Feb2017', sold:'false', soldDate:'',
        images:['https://images.unsplash.com/photo-1434082033009-b81d41d32e1c?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop=',
                'https://images.unsplash.com/photo-1475855581690-80accde3ae2b?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop=',
                'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?dpr=1&auto=compress,format&fit=crop&w=753&h=&q=80&cs=tinysrgb&crop=',
                'https://images.unsplash.com/photo-1430285561322-7808604715df?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop='
                ],
        description: `Too expensive
        `,
        noteIds: [] },
      { id: 11, Address: '6025 Sussex Ave', City: 'Burnaby', province : 'BC', postalCode: 'V5H3C3',
        price: '1,500,000,000', Room: 5, Bathroom: 3, registeredDate: '01Mar2017', sold:'false', soldDate:'',
        images:['https://images.unsplash.com/photo-1475855581690-80accde3ae2b?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop=',
                'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?dpr=1&auto=compress,format&fit=crop&w=753&h=&q=80&cs=tinysrgb&crop=',
                'https://images.unsplash.com/photo-1430285561322-7808604715df?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop=',
                'https://images.unsplash.com/photo-1434082033009-b81d41d32e1c?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop='
                ],
      description: `This house is awesome `,
        noteIds: [103, 104, 105] },
      { id: 12, Address: '4625 Grange st', City: 'Burnaby', province : 'BC', postalCode: 'V5H1R1',
        price: '1,100,000,000', Room: 3, Bathroom: 2, registeredDate: '01May2017', sold:'false', soldDate:'',
        images:['https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?dpr=1&auto=compress,format&fit=crop&w=753&h=&q=80&cs=tinysrgb&crop=',
                'https://images.unsplash.com/photo-1430285561322-7808604715df?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop=',
                'https://images.unsplash.com/photo-1434082033009-b81d41d32e1c?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop=',
                'https://images.unsplash.com/photo-1475855581690-80accde3ae2b?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop='
                ],
      description: `Why so expensive`,
        noteIds: [] },
        { id: 13, Address: '5951 Sussex Ave', City: 'Burnaby', province : 'BC', postalCode: 'V5H3B8',
          price: '500,000,000', Room: 2, Bathroom: 2, registeredDate: '01June2017', sold:'false', soldDate:'',
          images:['https://images.unsplash.com/photo-1494526585095-c41746248156?w=750',
                  'https://images.unsplash.com/photo-1430285561322-7808604715df?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop=',
                  'https://images.unsplash.com/photo-1434082033009-b81d41d32e1c?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop=',
                  'https://images.unsplash.com/photo-1475855581690-80accde3ae2b?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop='
                  ],
      description: `Perfect House`,
        noteIds: [103,105] },
        { id: 14, Address: '6636 Dow Ave', City: 'Burnaby', province : 'BC', postalCode: 'V5H3C1',
          price: '800,000,000', Room: 3, Bathroom: 2, registeredDate: '01July2017', sold:'false', soldDate:'',
          images:['https://images.unsplash.com/photo-1449844908441-8829872d2607?w=750',
                  'https://images.unsplash.com/photo-1430285561322-7808604715df?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop=',
                  'https://images.unsplash.com/photo-1494526585095-c41746248156?w=750',
                  'https://images.unsplash.com/photo-1475855581690-80accde3ae2b?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop='
                  ],
      description: `Town House`,
        noteIds: [101,105] },
        { id: 15, Address: '4567 Imperial st', City: 'Burnaby', province : 'BC', postalCode: 'V5J1B7',
          price: '950,000,000', Room: 3, Bathroom: 1, registeredDate: '01August2017', sold:'false', soldDate:'',
          images:['https://images.unsplash.com/photo-1464146072230-91cabc968266?w=750',
                  'https://images.unsplash.com/photo-1430285561322-7808604715df?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop=',
                  'https://images.unsplash.com/photo-1494526585095-c41746248156?w=750',
                  'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=750'
                  ],
        description: `Beautiful House`,
          noteIds: [102,104] }
  ]).then(response => {
    console.info('Properties', response.insertedCount);
    db.collection('notes').insertMany([
      { id: 101, note: 'It is no sale', timestamp: new Date() },
      { id: 102, note: 'The garage is broken', timestamp: new Date() },
      { id: 103, note: 'A buyer contacting the seller', timestamp: new Date() },
      { id: 104, note: 'The contract was failed', timestamp: new Date() },
      { id: 105, note: 'The swimming pool needs to be fixed', timestamp: new Date() },
      { id: 106, note: 'Attempting to discount the price', timestamp: new Date() },
    ]).then(response => {
      console.info('Notes', response.insertedCount);
      db.close();
    });
  });
});
