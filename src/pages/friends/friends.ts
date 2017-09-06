import { ConversationPage } from '../conversation/conversation';
import { timestamp } from 'rxjs/operator/timestamp';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './../../app/models/user.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import firebase from "firebase";
@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {
  users: any[] = [];
  me :any;
  userRef$ ;

  constructor(private fire: AngularFireAuth, private db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.me = this.getUser(this.fire.auth.currentUser.uid);
    this.userRef$ = this.db.object(`users/${this.me.uid}`);
    this.db.list("/users").subscribe(data =>{
      this.users = [];
      data.map(user =>{
        if(user.uid !== this.me.uid){
          this.users.push(user);
        }
        if(this.me.friends){
          if(this.me.friends[user.uid]){
            console.log(this.me.friends[user.uid]);
          }
        }
        
        
      });
      
    });
  }

  getUser(uid:string){
    let tempUser: any;
    this.db.object(`users/${uid}`).subscribe(data =>{
      tempUser = data;
      
    });
    return tempUser; 
  }
  addFriend(uid){
    let tempFriend = {};
    tempFriend[uid] = true;

    this.db.object(`users/${this.me.uid}/friends`).update(tempFriend).then(data =>{

    
      //alert new friend added
      let members = {};
      members[this.me.uid] = true;
      members[uid] = true;

      //create chat group
      this.db.list(`/members`).push(members).then(result =>{
        let chatKey = result.key;
        console.log(result.key);
        let chatRef = {};
        chatRef[chatKey] = true;

        this.db.object(`users/${this.me.uid}/chats`).update(chatRef).then(chat =>{

          this.db.list(`/messages/${chatKey}`).push({
            message: "Start chatting now",
            uid: 'computer',
            timestamp : firebase.database.ServerValue.TIMESTAMP
          }).then(msgRef =>{
            this.db.object(`chats/${chatKey}`).set({
              lastMessage: msgRef.key,
            });
          });
          
        });
        this.db.object(`users/${uid}/chats`).update(chatRef).then(data =>{
          let tempMe = {};
          tempMe[this.me.uid] = true;
          this.db.object(`users/${uid}/friends`).update(tempMe);
        });
      });
      //add items to friend 
      
      //change add button
    });
  }

  async sendMessage(uid){
    console.log('sending message to', uid);
    let chatObser = await this.getChat(uid);
    let chatUid;
 
    for(let index in chatObser){
      chatObser[index].forEach(members =>{
   
            if(members[this.me.uid] && members[uid]){
              chatUid = chatObser[index].$ref.key;
              this.navCtrl.setRoot(ConversationPage,  {
                chatUid: chatUid,
                friend_uid: uid
              });
            }
          });
    }
    
  }

  async getChat(uid){

      let chat :any = [] ;
      for (let chatUid in this.me.chats ){
      //  this.db.object(`/members/${chatUid}`).forEach(members =>{
      //    console.log(members);
      //     if(members[this.me.uid] && members[uid]){
      //       chat = chatUid;
      //     }
      //   });
        chat.push(this.db.object(`/members/${chatUid}`));
      }
      return chat;
  }

}


