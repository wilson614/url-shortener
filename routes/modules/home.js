const express = require('express')
const router = express.Router()
const Url = require('../../models/url')
const mainUrl = process.env.MAIN_URL || 'http://localhost:3000/'

const codeGenerator = require('../../codeGenerator')

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
})

router.post('/', (req, res) => {
  const origin = req.body.url
  let shortenUrl = ''

  Url.find()
    .lean()
    .then(urlList => {
      const newUrl = urlList.filter((url) => url.origin === origin)
      if (newUrl.length === 1) {
        shortenUrl = mainUrl + newUrl[0].shortenCode
        res.render('result', { shortenUrl })
      } else {
        let shortenCode = ''
        shortenCode = codeGenerator()
        while (urlList.some(url => url.shortenCode === shortenCode)) {
          shortenCode = codeGenerator()
        }
        shortenUrl = mainUrl + shortenCode
        Url.create({ origin, shortenCode })
          .then(() => res.render('result', { shortenUrl }))
          .catch(error => console.log(error))
      }
    })
    .catch(error => console.log(error))
})

module.exports = router
