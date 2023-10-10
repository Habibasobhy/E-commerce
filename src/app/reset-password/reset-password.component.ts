import { Component } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  
  apiError : string = '';

  isNotValidForm : boolean = false;

  constructor(private _authService : AuthService , private _router : Router){}

  resetPasswordForm : FormGroup = new FormGroup({
    "email": new FormControl('',[Validators.required,Validators.email]),
    "newPassword": new FormControl('',[Validators.required,Validators.pattern(/^([A-Z][a-z0-9]{3,8})$/g)])
  })

  resetPassword(form:FormGroup){
    console.log(form);
    console.log("value of form",form.value);
    if(form.valid){

      // ^ Calling API
      this._authService.resetPassword(form.value).subscribe({
        next: (res) => {
          console.log(res);

          // ^ Add token to local storage to made user login with new password
          localStorage.setItem("userToken",res.token);

          // ^ Call getUserData method that contain token and decode it
          this._authService.getUserData();


          //^  Go to home component
          this._router.navigate(['/home'])
        },
        error : (err) => {
          console.log(err);
          this.apiError = err.error.message;
        }
      })
    }
    else{
      this.isNotValidForm = true;
    }
    
  }
}
