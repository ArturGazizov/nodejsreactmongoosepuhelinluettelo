import React from 'react'


const Forms = ({addName,handleNameChange,handleNumberChange,newName,newNumber}) => 
(
  <form onSubmit={addName}>
          <div>
            nimi: <input value={newName}
            onChange={handleNameChange}/>
            numero: <input value={newNumber}
            onChange={handleNumberChange}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
)


export default Forms