import { User } from './../../app/models/user.model';

import { TabsPage } from '../tabs/tabs';
import { AngularFireAuth} from 'angularfire2/auth';
import { RegisterPage } from './../register/register';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from "firebase";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  usersRef$ ;
  userRef;
  user;
  alreadyHaveAccount = false;
  constructor(private db: AngularFireDatabase,private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  this.usersRef$ = this.db.list('/users');
  
  }
  login(provider:string){
    let authProvider;
  
    switch(provider){
      case "facebook":
        authProvider = new firebase.auth.FacebookAuthProvider();
        break;
        case "google":
        authProvider = new firebase.auth.GoogleAuthProvider();
        break;
        case "twitter":
        authProvider = new firebase.auth.TwitterAuthProvider();
        break;
    }

  

    this.fire.auth.signInWithPopup(authProvider).then((result)=>{
      this.user=  {
        uid: result.user.uid,
        photoURL: result.user.photoURL,
        email: result.user.email,
        name: result.user.displayName,
        messages : {
          
        },
        friends : {
          admin: true
        },
        timestamp: firebase.database.ServerValue.TIMESTAMP
      };
      this.userRef = this.db.object(`/users/${this.user.uid}`);
      this.userRef.subscribe(data =>{
        
        if (data.uid === undefined){
          console.log("user does not exist")
          this.userRef.set(this.user).then((result) => {
            console.log("result", result);
          }).catch(err=>{
            console.log(err);
          });
        }

        this.navCtrl.setRoot(TabsPage, {
          user: data});
      });

    }).catch((err)=>{
      console.error(err);
  });




  }

  email_login(){
    this.navCtrl.push(LoginPage);
  }
  register(){
    this.navCtrl.push(RegisterPage);
  }

}
