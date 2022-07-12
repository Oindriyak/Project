const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    cname: String,
	cemail: String,
	assigned:Boolean,
	paymentstatus:Boolean,
    payemnttype:String,
    price:Number,
	orderid:Number,
    status:String,
    pname:String,
    pemail:String,
    paymentid:String,
	city:String,
	lng:String,
	lat:String,
    subcat:String,
    type:String,
    date:String,
    time:String,
    rating:Number,
    review:String
})

// Export the model
const order = mongoose.model('orders', orderSchema)

module.exports = order