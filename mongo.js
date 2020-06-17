const mongoose = require('mongoose')

// Replace with the URL of your own database. Do not store the password on GitLab!
const url = 'mongodb+srv://missismama:'+process.argv[2]+'@cluster0-wcm2d.gcp.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(url)

const Teleph = mongoose.model('Telephone', {
  number: String,
  name: String
})

if (process.argv.length==5)
{
  const phonenumber = new Teleph({
    name: process.argv[3],
    number: process.argv[4]
  })
  phonenumber
    .save()
    .then(response => {
      console.log('number saved!')
      mongoose.connection.close()
    })
}
if (process.argv.length!=5)


  Teleph 
    .find({})
    .then(result => {
      console.log("phonebook:")
      result.forEach(telephonenumber => {
        console.log(telephonenumber.name+" "+telephonenumber.number)
      })
      mongoose.connection.close()
    })
/*

*/

