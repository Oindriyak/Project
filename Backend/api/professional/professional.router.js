const router = require('express').Router()
const professional = require('../../models/professional.model')
const professionalController = require('./professional.controller')

router.patch('/', professionalController.check)
router.post('/', professionalController.insert)
router.get('/', professionalController.get)
router.get('/',professionalController.find)

module.exports = router