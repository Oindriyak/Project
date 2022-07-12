const router = require('express').Router()
const user = require('../../models/user.model')
const userController = require('./user.controller')

router.patch('/', userController.check)
router.post('/', userController.insert)
router.get('/', userController.get)


module.exports = router