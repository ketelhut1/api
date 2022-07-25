const mongoose = require ('mongoose')


const Person = mongoose.model('Person',{

    Email : String,
    name : String,
    password : String,
   
})


module.exports = Person