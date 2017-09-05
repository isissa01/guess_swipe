
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ConversationPage } from '../pages/conversation/conversation';
import { TabsPage } from './../pages/tabs/tabs';
import { FriendsPage } from '../pages/friends/friends';
import { SettingsPage } from './../pages/settings/settings';
import { MessagesPage } from './../pages/messages/messages';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { ProfilePage } from '../pages/profile/profile';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from './../pages/login/login';
import { FIREBASE_CONFIG } from './firebase_auth';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';



import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MainPage } from '../pages/main/main';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainPage,
    LoginPage,
    RegisterPage,
    ProfilePage, 
    MessagesPage,
    SettingsPage,
    FriendsPage,
    TabsPage,
    ConversationPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule
  
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MainPage, 
    LoginPage,
    RegisterPage,
    ProfilePage,
    MessagesPage,
    SettingsPage,
    FriendsPage,
    TabsPage,
    ConversationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
