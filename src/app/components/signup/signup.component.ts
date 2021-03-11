import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  hide = true
  user = {
    name: "",
    rut: "",
    email: "",
    password: ""
  }
  rutValidator = true

  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  /**
   * signUp
   */
  signUp(){
    this.authService.signUp(this.user).subscribe(
      res => {
        this.openSnackBar("Usuario creado exitosamente ya puedes ingresar", "X")
        this.router.navigate(['/signin']);
      },
      err => {
        if(err.error.message === "RUT_OR_EMAIL_EXIST"){
          this.openSnackBar("El Rut o Correo ya existen en nuestro sistema", "X")
        } else {
          this.openSnackBar("Complete todos las campos", "X")
        }
        console.log(err)
      }
    )
  }

  /**
   * 
   * @param rutString 
   */
  rv(){
    if(!this.user.rut.includes("-") && this.user.rut != ""){
      this.user.rut = this.user.rut.slice(0,-1) + "-" + this.user.rut.slice(-1)
    }
    this.rutValidator = this.checkRut(this.user.rut)
  }

  /**
   * 
   * @param rutString 
   */
  checkRut(rutString:any) {
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutString)) return false;
    let tmp = rutString.split("-");
    let digv = tmp[1];
    let rut = tmp[0];
    if (digv === "K") digv = "k";
    return this.dv(rut) === Number(digv);
  };

  /**
   * 
   * @param T 
   */
  dv(T:any){
    let M = 0,
      S = 1;
    for (; T; T = Math.floor(T / 10)) S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
    return S ? S - 1 : "k";
  };

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
