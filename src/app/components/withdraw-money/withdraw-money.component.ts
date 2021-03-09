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
    amount: 0
  }
  actualBalance = ""

  constructor(private balanceService: BalanceService) { }

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
        console.log(res);
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
        console.log(res);
        this.getBalance()
      },
      err => console.log(err)
    )
  }
}
