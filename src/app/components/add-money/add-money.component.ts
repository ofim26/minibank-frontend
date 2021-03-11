import { Component, OnInit } from '@angular/core';
import { BalanceService } from '../../services/balance.service'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.component.html',
  styleUrls: ['./add-money.component.css']
})
export class AddMoneyComponent implements OnInit {

  balance = {
    userId: localStorage.getItem('userId'),
    amount: ""
  }
  actualBalance = ""

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
   * add
   */
  add(){
    if(parseInt(this.balance.amount) <= 0){
      this.openSnackBar("El monto no puede ser igual o menor a cero", "X")
    } else{
      this.balanceService.add(this.balance).subscribe(
        res => {
          this.balance.amount = "";
          this.getBalance()
          this.openSnackBar("Carga realizada exitosamente", "X")
        },
        err => console.log(err)
      )
    }
  }

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