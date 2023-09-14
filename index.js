require('dotenv').config()
require('./mongo')

const express = require('express')
const app = express()
const cors = require('cors')

const Artist = require('./models/Artist')

const notFound = require('./middlewares/notFound')
const handleErrors = require('./middlewares/handleErrors')

app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Hello world</h1>')
})

app.get('/api/artists', (request, response, next) => {
  Artist.find({})
    .then(artists => response.json(artists).end())
    .catch(next)
})

app.get('/api/artists/:id', (request, response, next) => {
  const { id } = request.params

  Artist.findById(id)
    .then(artist => {
      return artist
        ? response.json(artist)
        : response.status(404).end()
    })
    .catch(next)
})

app.put('/api/artists/:id', (request, response, next) => {
  const { id } = request.params
  const artist = request.body

  const newArtistInfo = {
    firstName: artist.firstName,
    lastName: artist.lastName,
    stageName: artist.stageName,
    gender: artist.gender,
    age: artist.age,
    birthDate: artist.birthDate,
    genre: artist.genre,
    bio: artist.bio,
    profileImage: artist.profileImage,
    socialMedia: artist.socialMedia,
    user: artist.user,
    creationDate: new Date()
  }

  Artist.findByIdAndUpdate(id, newArtistInfo)
    .then(result => {
      response.json(result)
    })
    .catch(next)
})

app.delete('/api/artists/:id', (request, response, next) => {
  const { id } = request.params

  Artist.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end()
    })
    .catch(next)
})

app.post('/api/artists', (request, response, next) => {
  const artist = request.body

  if (!artist) {
    return response.status(400).json({
      error: 'Invalid body request'
    })
  }

  if (!artist.firstName || !artist.lastName || !artist.bio || !artist.genre) {
    return response.status(400).json({
      error: 'Fill required fields'
    })
  }

  const newArtist = new Artist({
    firstName: artist.firstName,
    lastName: artist.lastName,
    stageName: artist.stageName,
    gender: artist.gender,
    age: artist.age,
    birthDate: artist.birthDate,
    genre: artist.genre,
    bio: artist.bio,
    profileImage: artist.profileImage,
    socialMedia: artist.socialMedia,
    user: artist.user,
    creationDate: new Date()
  })

  newArtist.save(newArtist)
    .then(savedArtist => {
      response.status(201).json(savedArtist)
    })
    .catch(next)
})

app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
