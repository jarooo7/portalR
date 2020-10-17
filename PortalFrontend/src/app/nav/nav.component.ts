import { Component, OnInit } from '@angular/core';
import { Login } from '../Models/login.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: Login =new Login();

  constructor() { }

  ngOnInit() {
  }

  login(){
    console.log(this.model);
    
  }

}
