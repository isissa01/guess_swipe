import  firebase  from 'firebase';


import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { User } from './../../app/models/user.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { Message } from './../../app/models/message.model';
import { TabsPage } from '../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html',
})
export class ConversationPage {
  friend : User;
  msg: string;
  messages: Message[] = [] ;
  user : User;
  msgSub;

  constructor(private db: AngularFireDatabase,private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    let uid = this.navParams.get("friend");
    let friendRef = this.db.object(`users/${uid}`);
    
    friendRef.subscribe(data =>{
      this.friend = data;
    });
    console.log(this.friend);
    
    this.user = this.navParams.get("user");
    this.msgSub = this.db.list('/messages').subscribe(data =>{
      this.messages = data;
    });

  }


  goBack(){
    this.navCtrl.setRoot(TabsPage);
  }
  sendMessage(){
    if(this.msg.trim() != ""){
      this.db.list("/messages").push({
        content: this.msg,
        from_uid: this.user.uid,
        to_uid: this.friend.uid,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      }).then((message)=>{
        this.msg = "";
  
      });
    }
    
  }
  

}
