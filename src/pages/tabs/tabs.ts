
import { FriendsPage } from './../friends/friends';
import { SettingsPage } from '../settings/settings';
import { ProfilePage } from '../profile/profile';
import { MessagesPage } from '../messages/messages';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  messagesPage = MessagesPage;
  profilePage = ProfilePage;
  settingsPage = SettingsPage;
  friendsPage = FriendsPage;
  params;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.params = this.navParams.data;
  }


}
