const router = require('express').Router()
const image = require('../../models/image.model')
const imageController = require('./image.controller')
const fs = require("fs");
const multer = require("multer");

router.post('/', imageController.insert)
router.get('/', imageController.get)