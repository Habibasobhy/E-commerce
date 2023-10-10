import { Component } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent {

  apiError : string = '';

  isNotValidForm : boolean = false;

  constructor(private _authService : AuthService , private _router : Router){}

  verifyCodeForm : FormGroup = new FormGroup({
    "resetCode": new FormControl('',[Validators.required])
  })

  verifyCode(form:FormGroup){
    console.log(form);
    
    if(form.valid){
      // ^ Calling API
      this._authService.verifyCode(form.value).subscribe({
        next: (res) => {
          console.log(res);

          // ^ Go to resetPassword Component
          this._router.navigate(['/resetPassword'])

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
