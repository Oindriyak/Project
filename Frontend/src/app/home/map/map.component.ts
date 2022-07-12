import { Component, OnInit ,ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { services as services } from '@tomtom-international/web-sdk-services';
import * as tt from '@tomtom-international/web-sdk-maps';
import * as ts from '@tomtom-international/web-sdk-services'
import SearchBox from '@tomtom-international/web-sdk-plugin-searchbox';// t from '@tomtom-international/web-sdk-plugin-searchbox';
@Component({
  selector: 'ap-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MapComponent implements OnInit {
	change() {
		throw new Error('Method not implemented.');
	}

  constructor(private httpclient: HttpClient) { }

  ngOnInit(): void {
    this.map = tt.map({
      key: '5ZNNvnOAHzp35XRY7fkZHOJr2OIWN7Ai',
      container: 'map',
      //style: 'api.tomtom.com/map/1/tile/basic/main',
      center:this.center,
      zoom:15
    });
    console.log(this.map)
       var options = {
        searchOptions: {
            key: '5ZNNvnOAHzp35XRY7fkZHOJr2OIWN7Ai',
            language: 'en-GB',
            limit: 5
        },
        autocompleteOptions: {
            key: '5ZNNvnOAHzp35XRY7fkZHOJr2OIWN7Ai',
             language: 'en-GB'
        }

    };
    this.map.addControl(new tt.GeolocateControl({
      positionOptions: {
          enableHighAccuracy: true
      },
      //trackUserLocation:true ,
      //showUserLocation:false
   })).on('dblclick',this.movemarker)
   
    var nav = new tt.NavigationControl({});
    this.map.addControl(nav, 'bottom-left');
    this.map.dragRotate.enable();
    //console.log(t)
    this.marker = new tt.Marker().setLngLat(this.map.getCenter()).setDraggable(true).addTo(this.map);
    var ttSearchBox = new SearchBox(services, options);
    
 //   var searchMarkersManager = new SearchMarkersManager(map);
    
    //ttSearchBox.on('tomtom.searchbox.resultsfound', handleResultsFound);  
    ttSearchBox.on('tomtom.searchbox.resultselected', this.select);
       
    //ttSearchBox.on('tomtom.searchbox.resultfocused', handleResultSelection);    
    //ttSearchBox.on('tomtom.searchbox.resultscleared', handleResultClearing);
    
    this.map.addControl(ttSearchBox, 'top-left');
   

    function codea(result:any){
      console.log(result.results)

    } 
    
  };


  title:string = 'my-map-app';
  map:any;
  marker:any;
  search:string=''
  center:any={lng:85,
    lat:25};
    select=(event:any)=>{
      console.log(this.map)
      //console.log(lat,lng)
      this.map.setCenter({lat:event.data.result.position.lat,lng:event.data.result.position.lng})
      this.marker.setLngLat({lat:event.data.result.position.lat,lng:event.data.result.position.lng})

      
    }
    movemarker=()=>{
      setTimeout(()=>{
        this.marker.setLngLat(this.map.getCenter())
        console.log("Yayy")
      },400)
      

      

    }
  
  
}
 
  
  
  


