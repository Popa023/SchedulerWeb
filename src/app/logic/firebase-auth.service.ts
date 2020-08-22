import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(
    private router: Router
  ) {

    const firebaseConfig = {
      apiKey: "AIzaSyB94LpzdcQ7L09sS-LMQW_AfszkSwAu7eI",
      authDomain: "scheduler-60456.firebaseapp.com",
      databaseURL: "https://scheduler-60456.firebaseio.com",
      projectId: "scheduler-60456",
      storageBucket: "scheduler-60456.appspot.com",
      messagingSenderId: "242140526975",
      appId: "1:242140526975:web:9bd5377550781cff30424a",
      measurementId: "G-DD0BKD8F1K"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
  login(email, password){
    // tslint:disable-next-line:only-arrow-functions
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
    });
  }

  signup(email, password){
    // tslint:disable-next-line:only-arrow-functions
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
    });
  }
  logout() {
    // tslint:disable-next-line:only-arrow-functions
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      // tslint:disable-next-line:only-arrow-functions
    }).catch(function(error) {
      // An error happened.
    });
  }

  getUser(){
    // tslint:disable-next-line:only-arrow-functions
    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        // User is signed in.
        this.router.navigate(['/availability']);
      } else {
        // No user is signed in.
        this.router.navigate(['/login']);
      }
    });
  }
}
