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
  friend;
  msg: string;
  messages =[] ;
  user;
  chatUid;
  msgSub;

  constructor(private db: AngularFireDatabase,private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
    this.chatUid = this.navParams.get("chatUid");
    console.log(this.chatUid);
    this.user = this.getUser(this.fire.auth.currentUser.uid);
    this.friend = this.getUser(this.navParams.get("friend_uid"))
    this.msgSub = this.db.list(`/messages/${this.chatUid}`).subscribe(data =>{
      this.messages = data;
      console.log(this.messages);
    });

  }


  goBack(){
    this.navCtrl.setRoot(TabsPage);
  }
  sendMessage(){
    if(this.msg.trim() != ""){
      this.db.list(`/messages/${this.chatUid}`).push({
        message: this.msg,
        uid: this.user.uid,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      }).then((message)=>{
        console.log(message);
        this.db.object(`chats/${this.chatUid}`).update({
          lastMessage: message.key
        })
        this.msg = "";
      });
    }
    
  }

  getUser(uid:string){
    let tempUser: any;
    this.db.object(`users/${uid}`).subscribe(data =>{
      tempUser = data;
      
    });
    return tempUser; 
  }
  

}
