const { Database, Lastkey} = require('./index.js');

Database.sync({ force: true })
  .then(() => {
    Lastkey.create({ key: 'b7cz' })
      .then(() => {
        Database.close();
      });
  });