const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const professionalSchema = new Schema({
    username: String,
	name:String,
	ph:Number,
	averagerating:String,
	//expertise:String,
	city:String,
	address:String,
	lat:String,
	lng:String,
	subcategory:[String],
	available:Boolean,
	requests:[Number],
	accepted:[Number],
	noofservice:Number,
	RecentServicesGiven:Number
	
})

// Export the model
const professional = mongoose.model('professionals', professionalSchema)

module.exports = professional