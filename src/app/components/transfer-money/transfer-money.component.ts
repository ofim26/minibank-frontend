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
    amount: 0,
    rut: ""
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
   * 
   */
  transfer(){
    this.balanceService.transfer(this.dataTransfer).subscribe(
      res => {
        console.log(res);
        this.getBalance()
      },
      err => console.log(err)
    )
  }

}
