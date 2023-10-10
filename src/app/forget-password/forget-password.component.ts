import { AuthService } from 'src/app/core/services/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

  apiError : string = '';

  isNotValidForm : boolean = false;

  constructor(private _authService : AuthService , private _router : Router){}

  // ^ Form and contain email that is formControl (name send to backend)
  forgetPassForm : FormGroup = new FormGroup({
    "email": new FormControl('',[Validators.required,Validators.email])
  })

  // ^ when user click to submit form 
  forgetPass(form:FormGroup){
    console.log(form);

    if(form.valid){
      this._authService.forgetPassword(form.value).subscribe({
        next: (res) => {
          console.log(res);

          this._router.navigate(['/verifyCode'])
        },
        error: (err) => {
          console.log(err);

          // to show error message in html 
          this.apiError = err.error.message; 
          
        }
      })
    }
    else{
      this.isNotValidForm = true;
    }
    
  }
}
