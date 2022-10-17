const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dopedigital:dopedigital@cluster0.v2nfoxa.mongodb.net/ecommerce?retryWrites=true&w=majority', { useUnifiedTopology: true }, (err) => {
    if (!err) { console.log('MongoDB connection succeeded.'); }
    else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});

require('./user.model');
require('./admin.model');