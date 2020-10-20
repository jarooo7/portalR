import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }

success(msg: string){
  alertify.success(msg);
}

error(msg: string){
  alertify.error(msg);
}

worning(msg: string){
  alertify.worning(msg);
}

message(msg: string){
  alertify.message(msg);
}



}
