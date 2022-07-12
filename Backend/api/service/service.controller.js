let serviceModel = require('../../models/service.model')

module.exports = {
    insert: async(req, res) => {
		let result = await serviceModel.findOne({ username: req.body.username }).exec()
        console.log(result)
		if(result)
			res.send({status:false})
		else{
			if (req.body) {

				dbResult = await serviceModel.insertMany(
					[{
						"category": req.body.category,
						"icon": req.body.icon,
						"subcategory": req.body.subcategory,
						"image": req.body.image,
					}]
				)
				if (dbResult)
					res.send({ status:true })
				else
					res.send({ status:false })
			}
		}
    },
	get: async (req,res)=>{
		let result = await serviceModel.find()
        if (!result){
			res.send({status:false})
		}
		else
			res.send({status:true,data:result})
		
	}
}