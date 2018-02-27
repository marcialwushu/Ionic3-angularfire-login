import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';


@Injectable()
export class FunctionsProvider {
  url: string;

  constructor(private http: Http, private afAuth: AngularFireAuth) {
    this.url = 'https://fir-66bda.firebaseio.com/login';
    
  }

  post(method: string, data: object): Observable<any> {
    return Observable.create((observer) => {
      this.afAuth.authState.first().subscribe((user: firebase.User) => {
        user.getIdToken().then((token) => {
          const url = this.url + method;
          const headers = new Headers({
            'Content-Type': 'aplication/json',
            Authorization: `Bearer ${token}`
          });
          const options = new RequestOptions({ headers, });
          this.http.post(url, data, options).map(res => res.json()).subscribe((response) => {
            observer.next(response);
          }, (error) => {
            observer.error(error);
          });
        });
      });
    });
  }

  put(){

  }

  delete(){

  }

  get(){

  }

}
