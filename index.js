const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

var morgan = require('morgan')

const Teleph = require('./models/persons')









morgan.token('contents', function (req, res) {

  return (JSON.stringify(req.body))
})

/*_events,_eventsCount,_maxListeners,outputData,outputSize,writable,destroyed,_last,chunkedEncoding,shouldKeepAlive,useChunkedEncodingByDefault,sendDate,_removedConnection,_removedContLen,_removedTE,_contentLength,_hasBody,_trailer,finished,_headerSent,socket,_header,_onPendingData,_sent100,_expect_continue,req,locals,_startAt,_startTime,writeHead,__onFinished,statusCode,statusMessage*/

app.use(morgan('/:method :url :status :res[content-length] - :response-time ms :res[header] :contents'))
app.use(cors())

app.use(bodyParser.json())


//
const formatNote = (note) => {
  const formattedNote = { ...note._doc, id: note._id }
  delete formattedNote._id
  delete formattedNote.__v

  return formattedNote
  /**/

}

app.use(express.static('build'))


/*
let notes = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '151017-12-10'
  },
  {
    id: 2,
    name: 'Martti Tienari',
    number: '242011-12-10'
  },

  {
    id: 3,
    name: 'Arto Järvinen',
    number: '332017-11-10'
  },
  {
    id: 4,
    name: 'Letvo Kutvonen',
    number: '422017-12-11'
  }
]
*/

app.put('/api/persons/:id', (request, response) => {

  const note = request.body
  const id=request.params.id

  Teleph.updateOne({ _id: id }, note).
    then((respon)=>response.json(formatNote(respon)))

})


app.post('/api/persons/', (request, response,next) => {




  const note = request.body
  //console.log(note)
  //note.id=Math.round(Math.random()*100000)//mongo itself generates ids


  /*
if (!note.name)
  response.status(400).json({ error: 'name not specified' })
if (!note.number)
  response.status(400).json({ error: 'number not specified' })
if (notes.find((arg)=>arg.name==note.name))
  response.status(400).json({ error: 'name must be unique' })
notes = notes.concat(note)
  response.json(note)
  */

  const thenote = new Teleph({
    name: note.name,
    number: note.number
  })

  thenote
    .save().catch(error => next(error))
    .then(savedNote => {
      if(savedNote)
      //if(response.status!="400"&&response.status!="404"&&response.status!=400&&response.status!=404)
        response.json(formatNote(savedNote))
        response.status(204).end()
    })



})

app.delete('/api/persons/:id', (request, response,next) => {

  //Teleph.deleteMany({_id:request.params.id})//they do not work with _id
  //Teleph.deleteMany({id:request.params.id})

  Teleph.deleteOne({_id:request.params.id}, function (err) {
    if (err) next(err)
  // deleted at most one tank document
  })
   
  //const id = Number(request.params.id)
  //notes = notes.filter(note => note.id !== id)

  response.status(204).end()



})





app.get('/info',(request, response,next)=>{
  Teleph
    .find({})
    .then(notes => {


      response.send('<span>Phonebook has info for '+notes.length+' people</span><br/><br/>'+(new Date()))      
    })
    .catch(error => next(error))
})


app.get('/api/persons/:id', (request, response,next) => {
  //const id = Number(request.params.id)
  //const note = notes.find(note => note.id === id )
  
  Teleph
  //.find({id:request.params.id})
    .find({_id:request.params.id})
    .then(notes => {
      let notess=notes.map(formatNote)
      if ( notes ) {
        response.json(notess)
      } else {
        response.status(404).end()
      }
    }).catch(error => next(error))
  
})







app.get('/api/persons', (request, response,next) => {
  Teleph
    .find({})
    .then(notes => {
      response.json(notes.map(formatNote))
    }).catch(error => next(error))
})



const errorHandler = (error, request, response, next) => {
  console.error(error.message)



  if (error.name === 'CastError') {
    console.log(error.message)
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') 
  {    
    console.log(error.message)
    return response.status(400).json({ error: error.message })  }

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
