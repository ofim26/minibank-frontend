import { Component, OnInit } from '@angular/core';
import { BalanceService } from '../../services/balance.service'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-transfer-money',
  templateUrl: './transfer-money.component.html',
  styleUrls: ['./transfer-money.component.css']
})
export class TransferMoneyComponent implements OnInit {
  
  dataTransfer = {
    userId: localStorage.getItem('userId'),
    amount: "",
    rut: ""
  }
  actualBalance = ""
  rutValidator = false

  constructor(
    private balanceService: BalanceService,
    private _snackBar: MatSnackBar) { }

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
    if(parseInt(this.dataTransfer.amount) <= 0){
      this.openSnackBar("El monto no puede ser igual o menor a cero", "X")
    } else{
      this.balanceService.transfer(this.dataTransfer).subscribe(
        res => {
          this.dataTransfer.amount = ""
          this.dataTransfer.rut = ""
          this.getBalance()
          this.openSnackBar("Transferencia realizada exitosamente", "X")
        },
        err => {
          console.log(parseInt(this.actualBalance.slice(1)) < parseInt(this.dataTransfer.amount))
          console.log(parseInt(this.actualBalance.slice(1)))
          console.log(parseInt(this.dataTransfer.amount))
          if(err.error.message === "USER_NOT_EXIST" && parseInt(this.actualBalance.slice(1)) < parseInt(this.dataTransfer.amount)){
            this.openSnackBar("No tienes suficiente saldo para realizar la transferencia y el usuario de destino no usa MiniBank", "X")
          } else if(err.error.message === "USER_NOT_EXIST"){
            this.openSnackBar("El usuario de destino no usa MiniBank", "X")
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
    if(!this.dataTransfer.rut.includes("-") && this.dataTransfer.rut != ""){
      this.dataTransfer.rut = this.dataTransfer.rut.slice(0,-1) + "-" + this.dataTransfer.rut.slice(-1)
    }
    this.rutValidator = this.checkRut(this.dataTransfer.rut)
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
