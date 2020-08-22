import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService} from '../../logic/firebase-auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailTextField: any;
  passwordTextField: any;
  constructor(
    private firebaseAuthService: FirebaseAuthService,
    // private router: Router
  ) {}
  ngOnInit(): void {
    this.getUser();
  }
  login(email, password): void {
    this.firebaseAuthService.login(email, password);
  }
  signup(email, password): void {
    this.firebaseAuthService.signup(email, password);
  }
  getUser(){
    this.firebaseAuthService.getUser();
    // this.router.navigate(['/availability']);
  }
}
