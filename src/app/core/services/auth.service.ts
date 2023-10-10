import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../interfaces/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

// * class to deal with api 

// if userData notEmpty then user made login , if userData empty ===> user not made login
  userData : BehaviorSubject<any> = new BehaviorSubject('');

  // to check localStorage contain token or not
  constructor(private _httpClient:HttpClient , private _router:Router){
    if(localStorage.getItem("userToken")){  // if have token ==> call getUserData method
      this.getUserData();
    }
  }

  // * get token from localStorage to encoded token 
  getUserData(){
    let encodedToken = JSON.stringify(localStorage.getItem("userToken"));
    let encoded = jwtDecode(encodedToken);

    console.log(encoded);

    // using .next because BehaviorSubject , the next value of userData is encoded
    this.userData.next(encoded);
  }


// * method to receive values of inputs to send this data to api to create new registeration or add new user in backend
// ~ Auth it is interface
  register(data:Auth) :Observable<any> {  
    //  used post because send data to api and backend
    // data ==> it is data taken from inputs and send it's value
    return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,data)
  }

  // * method to send values of inputs of login and sent to api to made user login
  login(data:Auth) :Observable<any> {  
    //  used post because send data to api and backend
    // data ==> it is data taken from inputs and send it's value
    return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,data)
  }

  // * method to made user log out
  logOut(){
    localStorage.removeItem("userToken");
    this.userData.next(null);
    this._router.navigate(['/login']);
  }

  // * method to forgetPassword and send email to BE
  forgetPassword(email : string) : Observable <any> {
    return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,email)
  }

  // * method to verifyCode and send resetCode to BE
  verifyCode(resetCode : string) : Observable <any>{
    return this._httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,resetCode)
  }

  // * method to resetPassword and send data that contain on email and new password to BE
  resetPassword(data : any) : Observable <any> {
    return this._httpClient.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,data)
  }
}



