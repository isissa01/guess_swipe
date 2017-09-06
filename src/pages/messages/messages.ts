import { User } from './../../app/models/user.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { Message } from './../../app/models/message.model';
import { ConversationPage } from '../conversation/conversation';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import firebase from "firebase";

/**
 * Generated class for the MessagesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {
  messages = [];
  user;
  friends = [];

  msgSub;
  constructor(private fire: AngularFireAuth, private db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
     this.user =this.getUser(this.fire.auth.currentUser.uid);
     
     this.messages = this.getMessages(this.user.uid);

  }
  getUser(uid:string){
    let tempUser ;
    this.db.object(`users/${uid}`).subscribe(data =>{
      tempUser = data;
      
    });
  return tempUser;
    
    
  }
  async addFriend(uid){

    let tempFr = this.friends.filter((friend) =>{
        friend.uid === uid;

    });
    if (tempFr.length == 0){
      this.db.object(`users/${uid}`).subscribe(data =>{
        let friend = data;

        this.friends.push(friend);

      });

    }

     
    
  }
  
  getMessages(uid){
    let tempMessages= [];
    this.db.object(`users/${uid}/chats`).subscribe(data =>{
      let chatsUids = data;
      for(let chatUid in chatsUids){
        this.db.object(`/chats/${chatUid}`).subscribe(chatData =>{
          console.log(chatData);
        });
        
      }
      
      
      // this.db.object(`users/${uid}/friends`);
    });
    // this.db.list('/messages').subscribe(data =>{
    //   data.map(message =>{

    //       tempMessages.push(message);
           
    //   });
    // });
    return tempMessages;
  }

  searchMessages(event){
    this.messages = this.getMessages(this.user.uid);
    let query:string = event.target.value;

    if(query && query.trim() != ''){
      this.messages = this.messages.filter((message)=>{
        return  (message.content.toLowerCase().indexOf(query.toLowerCase()) > -1);
      });


    }
  }
  gotoConversation(message){
    this.navCtrl.setRoot(ConversationPage, {friend: (this.user.uid == message.from_uid)? message.to_uid : message.from_uid, user: this.user});
  }

}
