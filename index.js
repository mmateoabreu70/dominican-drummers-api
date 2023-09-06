const express = require('express')
const cors = require('cors')

const app = express()
const logger = require('./loggerMiddleware')

app.use(cors())
app.use(express.json())
app.use(logger)

let artists = [
  {
    id: 1,
    firstName: 'Alex',
    lastName: 'Smith',
    stageName: 'BeatMaster',
    gender: 'Male',
    age: 30,
    birthDate: '1993-05-15',
    genre: 'Rock',
    bio: 'Passionate rock drummer with a flair for energetic beats.',
    profileImage: 'alex_smith.jpg', // Replace with image URL
    socialMedia: [
      { platform: 'Instagram', url: 'https://www.instagram.com/beatmasterdrums/' },
      { platform: 'Twitter', url: 'https://twitter.com/BeatMasterDrums' }
    ]
  },
  {
    id: 2,
    firstName: 'Lily',
    lastName: 'Williams',
    stageName: 'GrooveQueen',
    gender: 'Female',
    age: 28,
    birthDate: '1995-11-02',
    genre: 'Funk',
    bio: 'Funk drummer extraordinaire, spreading grooves wherever I play.',
    profileImage: 'lily_williams.jpg', // Replace with image URL
    socialMedia: [
      { platform: 'Instagram', url: 'https://www.instagram.com/groovequeenbeats/' },
      { platform: 'Facebook', url: 'https://www.facebook.com/GrooveQueenLily' }
    ]
  },
  {
    id: 3,
    firstName: 'Max',
    lastName: 'Johnson',
    stageName: 'RhythmMaster',
    gender: 'Male',
    age: 34,
    birthDate: '1989-09-20',
    genre: 'Pop',
    bio: 'Experienced pop drummer who loves creating catchy beats.',
    profileImage: 'max_johnson.jpg', // Replace with image URL
    socialMedia: [
      { platform: 'Instagram', url: 'https://www.instagram.com/rhythmmastermax/' },
      { platform: 'Facebook', url: 'https://www.facebook.com/MaxJohnsonDrums' }
    ]
  },
  {
    id: 4,
    firstName: 'Sophia',
    lastName: 'Garcia',
    stageName: 'BeatsVirtuoso',
    gender: 'Female',
    age: 25,
    birthDate: '1998-03-10',
    genre: 'Jazz',
    bio: 'Jazz drummer with a passion for intricate rhythms and improvisation.',
    profileImage: 'sophia_garcia.jpg', // Replace with image URL
    socialMedia: [
      { platform: 'Instagram', url: 'https://www.instagram.com/beatsvirtuoso/' },
      { platform: 'Twitter', url: 'https://twitter.com/SophiaBeats' }
    ]
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello world</h1>')
})

app.get('/api/artists', (request, response) => {
  response.json(artists)
})

app.get('/api/artists/:id', (request, response) => {
  const id = Number(request.params.id)
  const artist = artists.find(artist => artist.id === id)

  if (!artist) {
    response.status(404).end()
  }

  response.json(artist)
})

app.delete('/api/artists/:id', (request, response) => {
  const id = Number(request.params.id)
  artists = artists.filter(artist => artist.id !== id)
  response.status(204).end()
})

app.post('/api/artists', (request, response) => {
  const artist = request.body

  if (!artist) {
    return response.status(400).json({
      error: 'Invalid body request'
    })
  }

  if (!artist.firstName || !artist.lastName ||
        !artist.bio || !artist.genre) {
    return response.status(400).json({
      error: 'Fill required fields'
    })
  }

  const ids = artists.map(artist => artist.id)
  const maxId = Math.max(...ids)

  const newArtist = {
    id: maxId + 1,
    ...artist,
    date: new Date().toISOString()
  }

  artists = [...artists, newArtist]

  response.status(201).json(newArtist)
})

app.use((request, response) => {
  response.status(404).json({
    error: 'Not found'
  })
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
