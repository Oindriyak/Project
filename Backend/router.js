const router = require('express').Router()


router.use('/user', require('./api/user/user.router'))
router.use('/pro', require('./api/professional/professional.router'))
router.use('/service', require('./api/service/service.router'))
router.use('/order', require('./api/order/order.router'))
//router.use('/service', require('./api/payment/payment.router'))
//router.use('/image', require('./api/image/image.router'))

// router.use('/text', require('./api/text/text.router'))
//
router.use('/', (req, res) => {
    res.send('<h1 style="color:red;">Welcome to To-Do App</h1>')
})

module.exports = router