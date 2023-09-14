const mongoose = require('mongoose')
const { Schema, model } = mongoose

const { refactorSchema } = require('../utils/methods.js')

const socialMediaSchema = new Schema(
  { name: String, url: String },
  { _id: false }
)

const artistSchema = new Schema({
  firstName: String,
  lastName: String,
  stageName: String,
  gender: { type: String, enum: ['male', 'female'] },
  age: Number,
  birthDate: Date,
  genre: String,
  bio: String,
  profileImage: String,
  socialMedia: [socialMediaSchema],
  user: String,
  creationDate: Date
})

refactorSchema(artistSchema)

const Artist = model('Artist', artistSchema)

module.exports = Artist
