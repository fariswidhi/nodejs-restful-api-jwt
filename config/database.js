const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/node_rest_api';
mongoose.connect(mongoDB);
module.exports = mongoose;