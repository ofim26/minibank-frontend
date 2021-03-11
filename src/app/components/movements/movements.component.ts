import { Component, OnInit } from '@angular/core';
import { BalanceService } from '../../services/balance.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css']
})
export class MovementsComponent implements OnInit {
  movements:any = []
  displayedColumns: string[] = ['movementType', 'amount', 'createdAt'];
  dataSource = [];
  currentPage = 0
  data = {
    userId: localStorage.getItem('userId'),
    itemsPerPage: 10,
    currentPage: 0,
    total: 0
  }
  
  constructor(
    private balanceService: BalanceService,
    private router: Router) { }
  
  /**
   * 
   */
  ngOnInit(): void {
    this.getMovements(this.data.currentPage)
  }

  /**
   * 
   * @param page 
   */
  getMovements(page:any){
    let pageIndex:number = page.pageIndex
    this.data.currentPage = !pageIndex ? 0 :pageIndex;
    this.balanceService.getMovements(this.data).subscribe(
    res => {
      this.dataSource = res.rows
      this.data.total = res.count
    },
      err => console.log(err)
    )
  }

}