let userModel = require('../../models/user.model')

module.exports = {
    insert: async(req, res) => {
		let result = await userModel.findOne({ username: req.body.username }).exec()
        //console.log(result)
		if(result)
			res.send({status:false})
		else{
			if (req.body) {

				dbResult = await userModel.insertMany(
					[{
						"username": req.body.username,
						"password": req.body.password,
						"name":req.body.name,
						"ph":req.body.ph,
						"type":req.body.type,
						"city":req.body.city
						
					}]
				)
				if (dbResult)
					res.send({ status:true })
				else
					res.send({ status:false })
			}
		}
    },
	check: async(req, res) => {
        let search = req.body.username
        let result = await userModel.findOne({ username: search }).exec()
        //console.log(result)
		if (result){
			
			if(result.password==req.body.password)
				res.send({status:true ,data: result})
			else
				res.send({status:false,data: ''})
		}            
        else
            res.send({ status: false })
    },
	get: async (req,res)=>{
		let result = await userModel.find({ username: req.query.username })
        if (result){
			res.send({status:false, data:result
			})
		}
		else
			res.send({status:true})
		
	}
}