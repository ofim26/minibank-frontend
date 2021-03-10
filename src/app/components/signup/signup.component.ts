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
  alertMessage = ""
  alertState = false
  alertType = "success"
  rutValidator = false

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

  /**
   * signUp
   */
  signUp(){
    this.authService.signUp(this.user).subscribe(
      res => {
        this.alertMessage = "Usuario creado exitosamente ya puedes ingresar"
        this.alertState = true
        this.alertType = 'success'
        //this.router.navigate(['/signin']);
      },
      err => {
        this.alertState = true
        this.alertType = 'danger'
        if(err.error.message === "RUT_OR_EMAIL_EXIST"){
          this.alertMessage = "El Rut o Correo ya existen en nuestro sistema"
        } else {
          this.alertMessage = "Complete todos las campos"
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
}
