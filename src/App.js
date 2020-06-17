import React from 'react';
import Numerot from './components/Numerot'
import Forms from './components/Forms'
import Notification from './components/Notification'

import personService from './services/persons'
import './index.css'
/*
"_comment": "axios.get('http://localhost:3001/person')  
npm install json-server --save 
\"server\": \"json-server -p3001 db.json\" 
npm run server",
*/

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: '',
      newNumber: '',
      nmessage:''
    }

this.addName = this.addName.bind(this)
this.handleNumberChange = this.handleNumberChange.bind(this)
this.handleNameChange = this.handleNameChange.bind(this)
this.removeName = this.removeName.bind(this)

//this.toggleImportanceOf=this.toggleImportanceOf.bind(this)

 
  }

/*
toggleImportanceOf = (id) => {
  return () => {
    console.log('importance of '+id+' needs to be toggled')
  }
}
*/

componentDidMount() {


  personService
    .getAll()
    .then(response => {
      this.setState({persons: response})
    })
}

removeName =(id)=>{

return ()=>{

personService.get(id).then
( response=>
  {

    if (window.confirm(`Poistetaanko ${response.data[0].name} ?`))

personService.remove(id).then(()=>{
personService
    .getAll()
    .then(response1 => {
this.setState({persons: response1})
    })}
)
}
)


}
}


  addName = (event) => {
  event.preventDefault()
  const nameObject = {
    name: this.state.newName,
    number: this.state.newNumber,
    //date: new Date().toISOString(),
    //important: Math.random() > 0.5,
    id: Math.random()*1000000
  }


 
  personService
    .getAll()
    .then(response1 => {
    if(response1.find(it=>it.name===this.state.newName))
      {

this.setState({nmessage: ` '${this.state.newName}' name must be unique, so it was updated`})
setTimeout(() => {this.setState({nmessage: ''})}, 5000)

let updatedobject=response1.find(it=>it.name===this.state.newName)
updatedobject.name=nameObject.name
updatedobject.number=nameObject.number


personService.update(updatedobject.id,{'name':nameObject.name,'number':nameObject.number}).then(response2 =>{


if(response2.status!==204&&response2.status!=="204"&&response2.status!=="400"&&response2.status!=="404"&&response2.status!==400&&response2.status!==404)
personService
    .getAll().then(response3=>{
      this.setState({
        persons: response3,
        newName: '',
        newNumber: '',
      })
    })
        else
      {}
/*
*/

}).catch((error)=>{this.setState({nmessage: `Too short number or name could not be added`})
      setTimeout(() => {this.setState({nmessage: ''})}, 5000)})


return
      }
      
        if(this.state.newNumber.length===0)
      {
this.setState({nmessage: `For '${this.state.newName}' number not specified `})
setTimeout(() => {this.setState({nmessage: ''})}, 5000)
return
      }



   //axios.post('http://localhost:3001/notes', nameObject)
   personService.create(nameObject)
    //.then(response => {
    //  console.log(response)
    //})
    .then(response => {
      if(response.status!==204&&response.status!=="204"&&response.status!=="400"&&response.status!=="404"&&response.status!==400&&response.status!==404)
      {this.setState({
        persons: this.state.persons.concat(response.data),
        newName: '',
        newNumber: '',
      })
}
    else
      {
        }
    }).catch((error)=>{console.log("error")
//error.message just says that 499 error got, bad request
      this.setState({nmessage: error.response.data.error})
      setTimeout(() => {this.setState({nmessage: ''})}, 5000)})


  })


}

handleNameChange = (event) => {
    //console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }

handleNumberChange = (event) => {
    //console.log(event.target.value)
    this.setState({ newNumber: event.target.value })
  }



  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Notification message={this.state.nmessage}/>



        <Forms addName={this.addName} handleNameChange={this.handleNameChange}
        handleNumberChange={this.handleNumberChange} newName={this.state.newName} 
        newNumber={this.state.newNumber} />




        <Numerot persons={this.state.persons} functions={this.removeName}/>
      </div>
    )
  }
}

export default App
