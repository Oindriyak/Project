const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    category: String,
	icon:String,
	subcategory:[Object],
	image:String,
})

// Export the model
const service = mongoose.model('services', serviceSchema)

module.exports = service