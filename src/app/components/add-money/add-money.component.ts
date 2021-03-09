import { Component, OnInit } from '@angular/core';
import { BalanceService } from '../../services/balance.service'

@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.component.html',
  styleUrls: ['./add-money.component.sass']
})
export class AddMoneyComponent implements OnInit {

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
   * add
   */
  add(){
    this.balanceService.add(this.balance).subscribe(
      res => {
        this.getBalance()
        this.alertMessage = "Carga realizada exitosamente :D"
        this.alertState = true
      },
      err => console.log(err)
    )
  }
}