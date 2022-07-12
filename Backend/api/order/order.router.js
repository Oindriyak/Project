const router = require('express').Router()
const order = require('../../models/order.model')
const orderController = require('./order.controller')

router.patch('/', orderController.create)
router.post('/', orderController.setOrder)
router.put('/',orderController.getOrder)
router.put('/partner',orderController.setProfessional)
router.post('/partner',orderController.setRatingReview)

module.exports = router