import { Component, OnInit } from '@angular/core';
import { BalanceService } from '../../services/balance.service'

@Component({
  selector: 'app-withdraw-money',
  templateUrl: './withdraw-money.component.html',
  styleUrls: ['./withdraw-money.component.sass']
})
export class WithdrawMoneyComponent implements OnInit {

  balance = {
    userId: localStorage.getItem('userId'),
    amount: undefined
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
   * withdraw
   */
  withdraw(){
    this.balanceService.withdraw(this.balance).subscribe(
      res => {
        this.getBalance()
        this.alertMessage = "Retiro realizado exitosamente :D"
        this.alertState = true
      },
      err => console.log(err)
    )
  }
}
