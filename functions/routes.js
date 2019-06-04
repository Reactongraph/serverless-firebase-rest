var express = require('express')
var user = require('./controllers/user')

var router = express.Router()

router.use('/user',db,user)


module.exports = router


