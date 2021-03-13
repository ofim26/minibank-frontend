import { Component, OnInit } from '@angular/core';
import { BalanceService } from '../../services/balance.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators, FormGroup, } from "@angular/forms";

@Component({
  selector: 'app-transfer-money',
  templateUrl: './transfer-money.component.html',
  styleUrls: ['./transfer-money.component.css']
})
export class TransferMoneyComponent implements OnInit {
  
  actualBalance = ""
  rutValidator = false
  form: FormGroup = this.formBuilder.group({
    amount: [, { validators: [Validators.required], updateOn: "change" }],
    rut: [, { validators: [Validators.required], updateOn: "change" }],
  });

  constructor(
    private balanceService: BalanceService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getBalance()
  }

  /**
   * getBalance
   */
  getBalance(){
    this.balanceService.getBalance(localStorage.getItem('userId')).subscribe(
      res => {
        this.actualBalance = res.balance
      },
      err => console.log(err)
    )
  }

  /**
   * transfer
   */
  transfer(){
    const dataTransfer = {
      userId: localStorage.getItem('userId'),
      amount: this.form.controls.amount.value,
      rut: this.form.controls.rut.value
    }
    if(parseInt(this.form.controls.amount.value) <= 0){
      this.openSnackBar("El monto no puede ser igual o menor a cero", "X")
    } else{
      this.balanceService.transfer(dataTransfer).subscribe(
        res => {
          this.getBalance()
          this.form.reset()
          this.form.controls.amount.reset()
          this.form.controls.amount.setValue(null)
          this.form.controls.rut.reset()
          this.form.controls.rut.setValue(null)
          this.openSnackBar("Transferencia realizada exitosamente", "X")
        },
        err => {
          let actualBalance = parseFloat(this.actualBalance.split(",").join("").slice(1))
          if(err.error.message === "USER_NOT_EXIST"){
            if(actualBalance < parseFloat(this.form.controls.amount.value)){
              this.openSnackBar("No tienes suficiente saldo para realizar la transferencia y el usuario de destino no usa MiniBank", "X")
            } else{
              this.openSnackBar("El usuario de destino no usa MiniBank", "X")
            } 
          } else if(err.error.message === "THE_AMOUNT_EXCEEDS_THE_BALANCE"){
            this.openSnackBar("No tienes suficiente saldo para realizar la transferencia", "X")
          }
          console.log(err)
        }
      )
    }
  }

  /**
   * 
   * @param rutString 
   */
  rv(){
    let rut:string = this.form.controls.rut.value
    console.log(1, rut)
    if(!rut.includes("-") && rut != ""){
      this.form.controls.rut.setValue(rut.slice(0,-1) + "-" + rut.slice(-1))
      console.log(2, rut)
    }
    this.rutValidator = this.checkRut(rut)
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
