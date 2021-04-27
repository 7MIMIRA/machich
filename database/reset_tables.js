const { Database, Lastkey} = require('./index.js');

Database.sync({ force: true })
  .then(() => {
    Lastkey.create({ key: '' })
      .then(() => {
        Database.close();
      });
  });