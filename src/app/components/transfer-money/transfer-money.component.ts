import { Component, OnInit } from '@angular/core';
import { BalanceService } from '../../services/balance.service'
import { checkRut } from "simple-rut-validator";

@Component({
  selector: 'app-transfer-money',
  templateUrl: './transfer-money.component.html',
  styleUrls: ['./transfer-money.component.sass']
})
export class TransferMoneyComponent implements OnInit {
  
  dataTransfer = {
    userId: localStorage.getItem('userId'),
    amount: undefined,
    rut: undefined
  }
  actualBalance = ""
  alertMessage = ""
  alertState = false


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
   * 
   */
  transfer(){
    this.balanceService.transfer(this.dataTransfer).subscribe(
      res => {
        this.getBalance()
        this.alertMessage = "Transferencia realizada exitosamente :D"
        this.alertState = true
      },
      err => console.log(err)
    )
  }

}
