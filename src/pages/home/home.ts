import { MainPage } from './../main/main';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  skipMsg: string = "Skip";
  constructor(public navCtrl: NavController) {
    this.skipMsg = "Skip";
  }
  skipMessage(){
    this.navCtrl.push(MainPage);
  }
  
}
