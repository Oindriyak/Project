let orderModel = require('../../models/order.model')
let requestModel = require('../../models/request.model')
let professionalModel = require('../../models/professional.model')
let select =require('../select/select')
module.exports = {
    create: async(req, res) => {
		
		let c=true
		let x=0
        while(c){
			 x=Math.floor(Math.random()*999999+100000)
			let result = await orderModel.findOne({ orderid: x}).exec()
			console.log(result)
			
			if(result)
				c=true
			else
				c=false
		
		}
		//else{
			if (req.body) {
				dbResult = await orderModel.insertMany(
					[{
						"cemail": req.body.cemail,
						"cname":req.body.cname,
						"orderid":x,
						"date":req.body.date,
						"time":req.body.time
					}]
				)
				if (dbResult)
					res.send({ status:true ,orderid:x })
				else
					res.send({ status:false })
			}
		//}
    },
	setOrder: async(req, res) => {
        let search = req.body.orderid
        let result = await orderModel.findOne({ orderid: search }).exec()
        //console.log(result)
		console.log(req.body.city)
		select.a(search,req.body.lat,req.body.lng,req.body.subcat,req.body.city)
		if (result){
			dbResult = await orderModel.findOneAndUpdate({orderid:search},
                {
                    "payementstatus": req.body.payementstatus,
                    "paymentid":req.body.paymentid,
                    "assigned":false,
                    "price":req.body.price,
                    "paymenttype":req.body.payementtype,
					"city":req.body.city,
					"lng":req.body.lng,
					"lat":req.body.lat,
					"subcat":req.body.subcat,
					"type":req.body.type,
					"status":"booked"
                }
            )
			if(!dbResult)
				console.log(dbResult)
			else
				res.send({status:true})
		}            
        else{
			console.log('error')
            res.send({ status: false })
		}
    },


	getOrder:async(req, res) => {
        let search = req.body.email
		let i=req.body.limit
		let type=req.body.type
		console.log("yayy")
		if(type=="user"){
        	let result = await orderModel.find({ cemail: search }).limit(i).exec()
			if (result){
				res.send({status:true,data:result})
			}
			else
				res.send({status:false})
		}
		else if(type=="order"){
			let result = await orderModel.find({ orderid: search }).limit(i).exec()
			console.log("res",result)
			if (result){
				console.log("result",result)
				res.send({status:true,data:result})
			}
			else
				res.send({status:false})
		}
		else{
			let result = await orderModel.find({ pemail: search }).limit(i).exec()
			if (result){
				res.send({status:true,data:result})
			}
			else
				res.send({status:false})
		}
	},
	setProfessional:async(req,res)=>{
		
		let search = req.body.orderid
        
		let result = await orderModel.findOne({ orderid: search }).exec()
        //console.log(result)
		if (result){
			
			console.log(req.body)		
			
			if(req.body.status=="assigned"){
				console.log("Yayy")
				dbResult = await orderModel.findOneAndUpdate({orderid:search},
					{						
						pname:req.body.name,
						status:'assigned',
						pemail:req.body.email
						
					}
				).exec()
				console.log(dbResult)
				let a= await requestModel.find({ orderid: search }).exec()
				//let res = await requestModel.deleteOne({ orderid: search }).exec()
				console.log('saaaaaaaaaaaaaaaa',a[0])
				try{
					for(let i of a[0].email){
						let re  = await professionalModel.findOneAndUpdate({username:i},{
							$pull: { requests: search,request:search}
							//$pull: { requests: req.body.orderid }
						}).exec()
					}

				}
				catch(error){
					console.log(e)
				}
			}
			else if(req.body.status=='completed'){
				dbResult = await orderModel.findOneAndUpdate({orderid:search},
					{						
						pname:req.body.name,
						status:'completed',
						pemail:req.body.email		
					}
				).exec()
			}
		}            
        else
            res.send({ status: false })
	},

	setRatingReview:async(req,res)=>{
		let search = req.body.orderid
		console.log(req.body)
		dbResult = await orderModel.findOneAndUpdate({orderid:search},
			{						
				rating:req.body.rating,
				review:req.body.review		
			}
		).exec()
		//console.log(dbResult)	
		result =await professionalModel.find({username:req.body.email})
		//console.log("rating pro result ",result)
		let noofservice=result[0].noofservice;
		let rating= parseFloat( result[0].averagerating);
		console.log(rating)
		rating=rating*noofservice + req.body.rating
		console.log(rating)
		noofservice+=1
		rating=rating/noofservice
		console.log(rating)
		res = await professionalModel.findOneAndUpdate({username:req.body.pemail},
			{						
				averagerating:rating.toString(),
				noofservice:noofservice		
			}
		).exec()
		console.log(res)
		//if(dbResult){
		//	res.send({status:true})
		//}
		//else
		//	res.send({status:false})
	}



	
}