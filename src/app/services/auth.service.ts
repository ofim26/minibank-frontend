import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private URL = "https://minibank-backend.herokuapp.com/api"

  constructor(
    private http: HttpClient,
    private router: Router) { 
  }
  
  /**
   * signIn
   * @param user 
   */
  signIn(user:any){
    return this.http.post<any>(this.URL + '/users/authenticate', user);
  }

  /**
   * signUp
   * @param user 
   */
  signUp(user:any){
    return this.http.post<any>(this.URL + '/users', user);
  }

  /**
   * loggedIn
   */
  loggedIn(): Boolean {
    return !!localStorage.getItem('token');
  }
  
  /**
   * logout
   */
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }

  /**
   * getToken
   */
  getToken() {
    return localStorage.getItem('token');
  }
}
