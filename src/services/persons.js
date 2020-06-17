import axios from 'axios'
const baseUrl = '/api/persons'//
const baseUrl1 = '/info'

/*
before building and deploying to heroku
*/

//const baseUrl = 'http://localhost:3001/api/persons'
//const baseUrl1 = 'http://localhost:3001/info'
//for running on home server with concurrently subdependency


const getAll = () => {
  const request = axios.get(baseUrl)



  
  return request.then(response => {
    return response.data})
  return axios.get(baseUrl)
}


const getInfo = () => {
  const request = axios.get(baseUrl1)
 return request.then(response => {
    return response.data})
}



const create = (newObject) => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {

  return axios.put(`${baseUrl}/${id}`, newObject)
}


const remove = (id) => {


  return axios.delete(`${baseUrl}/${id}`)
}

const get = (id) => {
  return axios.get(`${baseUrl}/${id}`)
}

export default { getAll, create, update, remove ,get,getInfo}
