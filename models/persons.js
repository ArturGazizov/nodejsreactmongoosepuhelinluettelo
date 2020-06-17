const mongoose = require('mongoose')
require('mongoose-unique-validator')
// Replace with the URL of your own database. Do not store the password on GitLab!
const url = 'mongodb+srv://missismama:missismissis@cluster0-wcm2d.gcp.mongodb.net/test?retryWrites=true&w=majority'
   
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)
mongoose.connect(url,{poolSize: 30,reconnectTries: 5000, bufferMaxEntries: 0, useNewUrlParser: true})




const Teleph = mongoose.model('Telephone', {
  number: {type:String, minlength: 8},
  name: {type:String, unique:true,minlength: 3}
})


module.exports = Teleph
