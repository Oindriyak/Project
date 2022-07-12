export interface GeoLocation{
    lat:number;
    lng:number;
   }
  
  export interface StreetAddress{
   street:string;
   suite:string;
   city:string;
   zipcode:string;
   geo:GeoLocation;
  }
  
  export interface CompanyDetails{
    name:string;
    catchPhrase:string;
    bs:string;
   }
  
  export interface User {
    id:number;
    name:string;
    username: string;
    email:string;
    address:StreetAddress;
    phone:string;
    website:string;
    company:CompanyDetails;
  }