
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

import * as firebase from 'firebase/app';
import { Platform, LoadingController } from 'ionic-angular';

import { DataProvider } from '../data/data';
import { FunctionsProvider } from '../functions/functions';


@Injectable()
export class AuthProvider {
  public user: Observable<firebase.User>;

  constructor(
    private platform: Platform,
    private loadingCtrl: LoadingController,
    public afAuth: AngularFireAuth,
    private data: DataProvider,
    private functions: FunctionsProvider

  ) {
    this.user = afAuth.authState;
    
  }

  createUser(email: string, password: string): Promise<any>{
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password).then((data) => {
        this.functions.post('users',{}).subscribe(() => {
          resolve();
        });
      }, (error) => {
        reject(error);
      });
    });
  }

  signInWithEmailAndPassword(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then((data) => {
        resolve(data);
      }, (error) =>{
        reject(error);
      });
    });
  }

  logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut().then(() => {
        resolve();
      }, (error) => {
        reject(error);
      });
    });
  }

}
