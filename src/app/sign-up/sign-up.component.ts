import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'src/app/core/interfaces/auth';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  
  // ^ used to inject auth service to send values of inputs to api
  constructor(private _authService:AuthService , private _router:Router){}


  // * Loading 
  isLoading : boolean = false;

  // * To show api Error
  apiError : string = '';
  
  isNotValidForm : boolean = false;  // when button not disabled and 3mlt click 3la al btn mn 8eer m ad5l values x al inputs ytl3ly x when form is not valid al inputs is required

  // & RegisterForm and Validate
  registerForm : FormGroup = new FormGroup({
    "name": new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    "email": new FormControl('',[Validators.required,Validators.email]),
    "password": new FormControl('',[Validators.required,Validators.pattern(/^([A-Z][a-z0-9]{3,8})$/g)]),
    "rePassword": new FormControl('',[Validators.required,Validators.pattern(/^([A-Z][a-z0-9]{3,8})$/g)]),
    "phone": new FormControl('',[Validators.required,Validators.minLength(11),Validators.maxLength(11)]),
  },
  {
    validators : this.validateRePassword
  })


  register(form:FormGroup){
    console.log(form);  //* to log al registerForm ==> kol 7aga 3n inputs

    if(form.valid){  // ^ if al values of inputs al validation true hyd5ol x al if


      this.isLoading = true;  // al loading hy4t8l awl m a click on button y3ny 2bl m al data trg3

      this._authService.register(form.value).subscribe({
        next: (data:Auth) => 
        { 
          console.log(data);
          this.isLoading = false; // lmma al data trg3 al loading hy5tfy

          // ^ lmma y click 3la button w register tm yro7 direct 3la al login
          this._router.navigate(['/login']);
        },
        error: (err:any) => {
          // err.error.errors.msg ==> when password and rePassword not match
          // err.error.message ==> when email is already exists

          console.log(err);  // lw al user d5l email kan mwgood 2bl kda hytl3 msg error

          this.apiError = err.error.message;  // to show error message in html 
          this.isLoading = false;    // to stop loading after show error message
        }
        
      })
    }
    else{
      this.isNotValidForm = true;
    }
  }


  validateRePassword(registerForm : any){
    // ^To fetch password from registerForm
    let passwordControl = registerForm.get('password');

    // ^To fetch rePassword from registerForm
    let rePasswordControl = registerForm.get('rePassword');

    if(passwordControl.value == rePasswordControl.value){
      //lw al pass == rePass => yb2a mafee4 errors w return null
      return null;
    }
    else{
      // lw al rePass not equal al pass set error asmo rePasswordNotMatch and set al value bt3to al hya al message => "password and rePassword should be matched"
      rePasswordControl.setErrors({rePasswordNotMatch : "password and rePassword should be matched"})
      return {rePasswordNotMatch : "password and rePassword should be matched"};
    }
  }
}
