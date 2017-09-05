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
  messages:Message[] = [];
  user : User;

  friends: User[] = [];

  msgSub;
  constructor(private fire: AngularFireAuth, private db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
     this.user =this.getUser(this.fire.auth.currentUser.uid);
    
    this.msgSub = this.db.list('/messages').subscribe(data =>{
      data.map(message =>{
        if (message.to_uid === this.user.uid ){

           this.addFriend(message.from_uid);
        }
        else if (message.from_uid === this.user.uid){

          this.addFriend(message.to_uid);
          
        }
        this.messages.push(message);

        
      });
    });

  }
  getUser(uid:string){
    let tempUser: User;
    this.db.object(`users/${uid}`).subscribe(data =>{
      tempUser = data;
      
    });
  return tempUser
    
    
  }
  async addFriend(uid){

    let tempFr = this.friends.filter((friend) =>{
        friend.uid === uid;

    });
    if (tempFr.length == 0){
      this.db.object(`users/${uid}`).subscribe(data =>{
        let friend :User= data;

        this.friends.push(friend);

      });

    }

     
    
  }
  
  // getMessages(){
  //   this.user = this.db.list("/users");
  //   console.log(this.user);
  // }

  // searchMessages(event){
    
  //   let query = event.target.value;

  //   if(query && query.trim != ''){
  //     this.messages = this.messages.filter((message)=>{
  //       return  (message.)
  //     });


  //   }
  // }
  gotoConversation(message){
    this.navCtrl.setRoot(ConversationPage, {friend: (this.user.uid == message.from_uid)? message.to_uid : message.from_uid, user: this.user});
  }

}
