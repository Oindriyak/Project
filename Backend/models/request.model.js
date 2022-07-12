const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema({
    orderid:Number,
	email:[String],
})

// Export the model
const request = mongoose.model('requests', requestSchema)

module.exports = request