const mongoose = require('mongoose');

const Clients = new mongoose.Schema({
    name: {
        type: String,
       required: [true, "Please fill this part"],
        lowercase: true,
        max: 23,
      },
    
      email: {
        type: String,
       // required: true,
        lowercase: true,
    
      },
    
      
    
      message: {
        type: String, 
      },
    });
 
 
 
   

module.exports = mongoose.model('ClientMessages', Clients);