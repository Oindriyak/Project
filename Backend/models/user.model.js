const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:String ,
	password: String,
	name:String,
	type:String,
	ph:Number,
	
})

// Export the model
const user = mongoose.model('users', userSchema)

module.exports = user