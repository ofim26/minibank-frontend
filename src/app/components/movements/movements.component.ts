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
  data = {
    userId: localStorage.getItem('userId'),
    itemsPerPage: 10,
    currentPage: 0,
    total: 0
  }

  constructor(
    private balanceService: BalanceService,
    private router: Router) { }

  ngOnInit(): void {
    this.getMovements(this.data.currentPage)
  }

  getMovements(page:number){
    this.data.currentPage = page;
    this.balanceService.getMovements(this.data).subscribe(
      res => {
        this.movements = res.rows
        this.data.total = res.count
      },
        err => console.log(err)
      )
    }
  }