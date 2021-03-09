import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

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

  signUp(){
    this.authService.signUp(this.user).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/signin']);
      },
      err => console.log(err)
    )
  }
}
