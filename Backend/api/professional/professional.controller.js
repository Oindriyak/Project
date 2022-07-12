let professionalModel = require('../../models/professional.model')

module.exports = {
    insert: async(req, res) => {
		let result = await professionalModel.findOne({ username: req.body.username }).exec()
        console.log(result)
		if(result)
			res.send({status:false})
		else{
			console.log(req.body)
			var dbResult = await professionalModel.insertMany(
				[{
					"username":req.body.username,
					"name":req.body.name,
					"ph":req.body.ph,
					"subcategory":req.body.subcategory,
					"city":req.body.city,
					"address":req.body.address,
					"lat":req.body.lat,
					"lng":req.body.lng,
					"noofservice":1,
					"averagerating":"5"
				}]
			)
			console.log(dbResult)
			if (dbResult){
				console.log("Success")
				console.log(dbResult)
				res.send({ status:true })
			}
			else
				res.send({ status:false })
		
		}
    },
	check: async(req, res) => {
        let search = req.body.username
        let result = await professionalModel.findOne({ username: search }).exec()
        console.log(result)
		if (result){
			
			if(result)
				res.send({status:true ,data: result.name})
			else
				res.send({status:false,data: ''})
		}            
        else
            res.send({ status: false })
    },
	get: async (req,res)=>{
		let result = await professionalModel.find({ username: req.query.username })
        
		if (result){
			res.send({status:false,data:result})
		}
		else
			res.send({status:true})
		
	},
	find: async (req,res)=>{
		let result = await professionalModel.find({ city:'Kalyani' })
        console.log('result ',result)
		if (result){
			res.send({status:true,data:result})
		}
		else
			res.send({status:false})

	}
}