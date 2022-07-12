const router = require('express').Router()
const service = require('../../models/service.model')
const serviceController = require('./service.controller')


router.post('/', serviceController.insert)
router.get('/', serviceController.get)


module.exports = router