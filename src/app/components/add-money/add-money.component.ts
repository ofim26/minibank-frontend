import { Component, OnInit } from '@angular/core';
import { BalanceService } from '../../services/balance.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators, FormGroup, } from "@angular/forms";


@Component({
  selector: 'app-add-money',
  templateUrl: './add-money.component.html',
  styleUrls: ['./add-money.component.css']
})
export class AddMoneyComponent implements OnInit {
  constructor(
    private balanceService: BalanceService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getBalance()
  }

  actualBalance = ""
  form: FormGroup = this.formBuilder.group({
    amount: [, { validators: [Validators.required], updateOn: "change" }],
  });


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
    const balance = {
      userId: localStorage.getItem('userId'),
      amount: this.form.controls.amount.value
    }
    if(parseInt(balance.amount) <= 0){
      this.openSnackBar("El monto no puede ser igual o menor a cero", "X")
    } else{
      this.balanceService.add(balance).subscribe(
        res => {
          this.getBalance()
          this.openSnackBar("Carga realizada exitosamente", "X")
          this.form.reset()
          this.form.controls.amount.reset()
          this.form.controls.amount.setValue(null)
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