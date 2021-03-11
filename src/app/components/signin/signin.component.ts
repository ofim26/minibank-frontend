import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  hide = true
  user = {
    email: "",
    password: ""
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  
  /**
   * signIn
   */
  signIn(){
    this.authService.signIn(this.user).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.id);
        this.router.navigate(['/add-money']);
      },
      err => {
        this.openSnackBar("Tu usuario o contraseña son incorrectos", "X")
        console.log(err)
      }
    )
  }

  /**
   * openSnackBar
   * 
   * @param message 
   * @param action 
   */
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 10000,
      verticalPosition: 'top'
    });
  }
}