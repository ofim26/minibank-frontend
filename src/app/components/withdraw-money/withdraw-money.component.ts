import { Component, OnInit } from '@angular/core';
import { BalanceService } from '../../services/balance.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators, FormGroup, } from "@angular/forms";

@Component({
  selector: 'app-withdraw-money',
  templateUrl: './withdraw-money.component.html',
  styleUrls: ['./withdraw-money.component.css']
})
export class WithdrawMoneyComponent implements OnInit {

  actualBalance = ""
  form: FormGroup = this.formBuilder.group({
    amount: [, { validators: [Validators.required], updateOn: "change" }],
  });
  constructor(
    private balanceService: BalanceService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) { }

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
   * withdraw
   */
  withdraw(){
    const balance = {
      userId: localStorage.getItem('userId'),
      amount: this.form.controls.amount.value
    }
    if(parseFloat(balance.amount) <= 0){
      this.openSnackBar("El monto no puede ser igual o menor a cero", "X")
    } else{
      this.balanceService.withdraw(balance).subscribe(
        res => {
          this.getBalance()
          this.openSnackBar("Retiro realizado exitosamente", "X")
          this.form.reset()
          this.form.controls.amount.setValue(null)
        },
        err => {
          if(err.error.message === "THE_AMOUNT_EXCEEDS_THE_BALANCE"){
            this.openSnackBar("No tienes suficiente saldo para realizar la transferencia", "X")
          }
          console.log(err)
        }
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
