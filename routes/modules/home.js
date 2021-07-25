const express = require('express')
const router = express.Router()
const Url = require('../../models/url')

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/:shortenCode', (req, res) => {
  const shortenCode = req.params.shortenCode

  Url.findOne({ shortenCode })
    .lean()
    .then(url => {
      if (url) {
        res.redirect(url.origin)
      }
    })
    .catch(error => console.log(error))
  res.render('index')
})

module.exports = router
