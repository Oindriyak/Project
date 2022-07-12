import { Component, OnInit ,ViewEncapsulation,Input,Output, EventEmitter,OnChanges,SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { User } from './user';
import { services as services } from '@tomtom-international/web-sdk-services';
import * as tt from '@tomtom-international/web-sdk-maps';
import * as ts from '@tomtom-international/web-sdk-services'
import SearchBox from '@tomtom-international/web-sdk-plugin-searchbox';// t from '@tomtom-international/web-sdk-plugin-searchbox';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class MapComponent implements OnInit,OnChanges {
  
  
  @Input() center:any

  //@Input() center:any;
  @Input() type:any;
  @Output() out = new EventEmitter<any>()
  constructor(private httpclient: HttpClient) { }
  
  ngOnChanges(changes: SimpleChanges) {
    console.log("YAyy")
    
    if (!changes.center.firstChange) {
      console.log("sds")
      // only logged upon a change after rendering
      console.log('Laljsd',changes.center.currentValue);
    }
  }

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
    if(this.type==true)
      this.marker = new tt.Marker().setLngLat(this.map.getCenter()).setDraggable(true).addTo(this.map);
    else
      this.marker = new tt.Marker().setLngLat(this.map.getCenter()).setDraggable(false).addTo(this.map);
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
  change=()=>{
    this.map.setCenter({lat:this.center.lat,lng:this.center.lng})
    this.marker.setLngLat({lat:this.center.lat,lng:this.center.lng})

  }
    
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


    submit(){
      //console.log('ooaa')
      let position=this.marker.getLngLat()
      let a={
        postion:position,
        change:true

      }
      this.out.emit(a);
    }
    cancel(){
        this.out.emit({change:false})
    }
  
  
}
 
  
  
  


