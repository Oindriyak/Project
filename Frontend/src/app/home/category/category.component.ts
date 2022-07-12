import { Component, OnInit ,Input } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
	@Input() cat:any;

  checkout(i:number){
    // Simulate a mouse click:
    let name="checkout/"+this.cat.category+"/"+this.cat.subcategory[i].name
    window.location.href = name;
  }
}
