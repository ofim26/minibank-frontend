import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent implements OnInit {

  user = {
    name: "",
    rut: "",
    email: "",
    password: ""
  }

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }
  
  signIn(){
    this.authService.signIn(this.user).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.id);
        this.router.navigate(['/add-money']);
      },
      err => console.log(err)
    )
  }
}
