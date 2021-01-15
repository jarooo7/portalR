import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  registerMod = false;
  info = false;

  constructor() { }

  ngOnInit() {
  }
  register(){
    this.registerMod = true;
  }
  cancel(a: string){
    this.registerMod = false;
  }
  toggleMore(){
    this.info= !this.info;
  }

}
