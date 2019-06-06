var express = require('express')
var user = require('./controllers/user')

var router = express.Router()

router.use('/user',user)


module.exports = router


