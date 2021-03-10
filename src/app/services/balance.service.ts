import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  private URL = "https://minibank-backend.herokuapp.com/api"

  constructor(private http: HttpClient) { }

  /**
   * findAllByUserId
   * @param user 
   */
  getMovements(data:object){
    return this.http.post<any>(this.URL + '/movements/', data);
  }

  /**
   * add
   * @param data 
   */
  add(data:object){
    return this.http.put<any>(this.URL + '/balance/add', data);
  }

  /**
   * withdraw
   * @param data 
   */
  withdraw(data:object){
    return this.http.put<any>(this.URL + '/balance/withdraw', data);
  }

  /**
   * transfer
   * @param data 
   */
  transfer(data:object){
    return this.http.put<any>(this.URL + '/balance/transfer', data);
  }

  /**
   * getBalance
   * @param data 
   */
  getBalance(userId:any){
    return this.http.get<any>(this.URL + '/balance/'+userId);
  }
}