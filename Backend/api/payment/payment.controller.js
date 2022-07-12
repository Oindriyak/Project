const Razorpay = require('razorpay'); 
const razorpayInstance = new Razorpay({
    key_id: rzp_test_lVGPOgZieAvnyb,
    key_secret: daL2ooNFWPYRK29nBFHc68jV
});
module.exports = {
    find : (req, res)=>{  
        
        var options = {
            amount: 50000,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
          };
          instance.orders.create(options, function(err, order) {
            console.log(order);
            if(err){
                res.send({status:false,err:err})
            }
            else
                res.send({status:true,orderid=order.id})
          });
    }
}

