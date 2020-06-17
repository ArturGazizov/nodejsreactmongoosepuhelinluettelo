import React from 'react'

//import personService from '../services/persons'

const Numerot = ({persons,functions}) => 
{


//onClick=personService.remove(id)

  return (
    <div>


<h2>Numerot</h2>
        <ul>
        {persons.map(it=><li key={it.id}>{it.name}&nbsp;{it.number}<button onClick={functions(it.id)}> poista </button></li>)}
        </ul>

      
      
    </div>
  )
}


export default Numerot