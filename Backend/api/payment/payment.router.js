const router = require('express').Router()
const paymentController = require('./payment.controller')

router.get('/', paymentController.find)


module.exports = router