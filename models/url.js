const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlSchema = new Schema({
  origin: {
    type: String,
    required: true
  },
  shortenCode: {
    type: String
  }
})

module.exports = mongoose.model('Url', urlSchema)
