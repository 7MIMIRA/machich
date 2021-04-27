const { Database, Lastkey} = require('./index.js');

Database.sync({ force: true })
  .then(() => {
    Lastkey.create({ key: 'b7c62' })
      .then(() => {
        Database.close();
      });
  });