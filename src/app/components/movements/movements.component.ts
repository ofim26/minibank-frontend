import { Component, OnInit } from '@angular/core';
import { BalanceService } from '../../services/balance.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.sass']
})
export class MovementsComponent implements OnInit {

  movements:any = []
  userId = localStorage.getItem('userId')

  constructor(
    private balanceService: BalanceService,
    private router: Router) { }

  ngOnInit(): void {
    this.balanceService.findAllByUserId(this.userId).subscribe(
      res => {
        this.movements = res;
      },
      err => console.log(err)
    )
  }
}

