require('dotenv').config();

const { sequelize } = require('./src/models');
const { start } = require('./src/server');


sequelize.sync().then(() => {
    console.log('You did it');
    start();
}).catch(err => console.error(err));