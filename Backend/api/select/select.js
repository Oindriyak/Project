let professionalModel= require('../../models/professional.model')
let orderModel= require('../../models/order.model')
let requestModel= require('../../models/request.model')
let emp;
function matchMaking(lat, lng,employees) {
    console.log("Employees",employees[0])
    var tempArr = employees;
    
    
    //if(tempArr.length == 0) {
    //  return "All employees are busy";
    //}
    console.log("Yayy ",employees[0])

    employees.sort((emp1, emp2) => {
      if(emp1.averagerating < emp2.averagerating)
        return 1;
      if(emp1.averagerating > emp2.averagerating)
        return -1;
      if(emp1.averagerating == emp2.averagerating) {
        //if(emp1.RecentServicesGiven < emp2.RecentServicesGiven)
        //  return 1;
        //if(emp1.RecentServicesGiven > emp2.RecentServicesGiven)
        //  return -1;
        //if(emp1.RecentServicesGiven == emp2.RecentServicesGiven) {
          if(true){
            let lng1 =  lng * Math.PI / 180;
            let lng2 = emp1.lng* Math.PI / 180;
            lat1 = lat * Math.PI / 180;
            lat2 = emp1.lat * Math.PI / 180;
            // Haversine formula
            let dlng = lng2 - lng1;
            let dlat = lat2 - lat1;
            let a = Math.pow(Math.sin(dlat / 2), 2)
                     + Math.cos(lat1) * Math.cos(lat2)
                     * Math.pow(Math.sin(dlng / 2),2);       
            let dis1 = 2 * Math.asin(Math.sqrt(a)) * 6371 
            
            
            lng1 =  lng * Math.PI / 180;
            lng2 = emp2.lng* Math.PI / 180;
            lat1 = lat * Math.PI / 180;
            lat2 = emp2.lat * Math.PI / 180;
            // Haversine formula
            dlng = lng2 - lng1;
            dlat = lat2 - lat1;
            a = Math.pow(Math.sin(dlat / 2), 2)
                     + Math.cos(lat1) * Math.cos(lat2)
                     * Math.pow(Math.sin(dlng / 2),2);       
            let dis2 = 2 * Math.asin(Math.sqrt(a)) * 6371    
            
            
          
          //const dis2 = (lat - emp2.Latitude)*(lat - emp2.Latitude) + (long - emp2.Longitude)*(long - emp2.Longitude);
          if(dis1 > dis2)
            return 1;
          if(dis1 < dis2)
            return -1;
          return 0;
        }
      }
    });
    

    //const yourEmp = tempArr[0];
    /*for(let i=0; i <employees.length; i++) {
      if(employees[i].EmpId == yourEmp.EmpId) {
        employees[i].Busy = true;
        return yourEmp;S
      }
    }*/
    console.log('temparr',employees[0])
    return employees
}


module.exports ={
    a: async (orderid,lat,lng,subcat,city)=>{
        console.log('A', subcat,city)

        let result = await professionalModel.find({subcategory:subcat,city:city})
        //console.log('result',result)
        if (result){
          console.log('Result length',result.length)
          console.log('Result ',result[1])
    		let a= await matchMaking(lat,lng,result)
            let l = a.length <5 ? a.length : 5
            let b=[]
            
            for(let i=0 ;i<l ; i++){
              // console.log(a[i])
               let dbres=  await professionalModel.findOneAndUpdate({username : a[i].username},
                    {
                        $push: { requests: orderid }
                    }
                )
                console.log(a[i].username)
                b.push(a[i].username)
                
            }
            console.log(orderid, b[0],b[1])
            let res =await requestModel.insertMany([{
              "orderid":orderid,
              "email":b
            }])
            
		}
  }

}


