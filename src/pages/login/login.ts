import { TabsPage } from './../tabs/tabs';
import  firebase  from 'firebase';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: string;
  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    firebase.auth().signInWithEmailAndPassword(this.username, this.password).then((response)=>{
      console.log(response);
      this.navCtrl.setRoot(TabsPage, {user: response});
    }).catch((err)=>{
      console.error(err);
    });
  }

}
