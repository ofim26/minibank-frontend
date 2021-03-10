import { Component, OnInit } from '@angular/core';
import { BalanceService } from '../../services/balance.service'

@Component({
  selector: 'app-transfer-money',
  templateUrl: './transfer-money.component.html',
  styleUrls: ['./transfer-money.component.sass']
})
export class TransferMoneyComponent implements OnInit {
  
  dataTransfer = {
    userId: localStorage.getItem('userId'),
    amount: "",
    rut: ""
  }
  actualBalance = ""
  alertMessage = ""
  alertState = false
  alertType = "success"
  rutValidator = false


  constructor(private balanceService: BalanceService) { }

  ngOnInit(): void {
    this.getBalance()
  }

  /**
   * alertClose
   */
  alertClose(){
    this.alertState = false
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
    this.balanceService.transfer(this.dataTransfer).subscribe(
      res => {
        this.getBalance()
        this.alertMessage = "Transferencia realizada exitosamente :D"
        this.alertState = true
        this.alertType = 'success'
      },
      err => {
        console.log(parseInt(this.actualBalance.slice(1)))
        console.log(parseInt(this.dataTransfer.amount))
        this.alertState = true
        this.alertType = 'danger'
        if(err.error.message === "USER_NOT_EXIST" && parseInt(this.actualBalance.slice(1)) < parseInt(this.dataTransfer.amount)){
          this.alertMessage = "No tienes suficiente saldo para realizar la transferencia y el usuario de destino no usa MiniBank"
        } else if(err.error.message === "USER_NOT_EXIST"){
          this.alertMessage = "El usuario de destino no usa MiniBank"
        } else if(err.error.message === "THE_AMOUNT_EXCEEDS_THE_BALANCE"){
          this.alertMessage = "No tienes suficiente saldo para realizar la transferencia"
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
    if(!this.dataTransfer.rut.includes("-")){
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

}
