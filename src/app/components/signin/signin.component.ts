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
  alertMessage = ""
  alertState = false

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * alertClose
   */
  alertClose(){
    this.alertState = false
  }
  
  signIn(){
    this.authService.signIn(this.user).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.id);
        this.router.navigate(['/add-money']);
      },
      err => {
        this.alertState = true
        this.alertMessage = "Tu usuario o contraseña son incorrectos"
        console.log(err)
      }
    )
  }
}
