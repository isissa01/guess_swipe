import { TabsPage } from './../tabs/tabs';
import { AngularFireAuth } from 'angularfire2/auth';
import { MainPage } from './../main/main';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  skipMsg: string = "Skip";
  user;
  constructor(private fire: AngularFireAuth,public navCtrl: NavController) {
    this.skipMsg = "Skip";
    this.user = this.fire.auth.currentUser;
    console.log(this.user);
    if(this.user){
      this.navCtrl.setRoot(TabsPage, {user: this.user});
    }
  }
  skipMessage(){
    this.navCtrl.push(MainPage);
  }
  
}
