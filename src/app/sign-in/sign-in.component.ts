import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'src/app/core/interfaces/auth';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  // ^ used to inject auth service to send values of inputs to api
  constructor(private _authService:AuthService , private _router:Router){}


  // * Loading 
  isLoading : boolean = false;
  apiError : string = '';
  isNotValidForm : boolean = false;  // when button not disabled and 3mlt click 3la al btn mn 8eer m ad5l values x al inputs ytl3ly x when form is not valid al inputs is required

  // & LoginForm and Validate
  LoginForm : FormGroup = new FormGroup({
    "email": new FormControl('',[Validators.required,Validators.email]),
    "password": new FormControl('',[Validators.required,Validators.pattern(/^([A-Z][a-z0-9]{3,8})$/g)]),
  })


  login(form:FormGroup){
    console.log(form);  //* to log al LoginForm ==> kol 7aga 3n inputs

    if(form.valid){  // ^ if al values of inputs al validation true hyd5ol x al if


      this.isLoading = true;  // al loading hy4t8l awl m a click on button y3ny 2bl m al data trg3

      this._authService.login(form.value).subscribe({
        next: (data:Auth) => 
        { 
          console.log(data);
          this.isLoading = false; // lmma al data trg3 al loading hy5tfy


          // to make key (userToken) in localStorage and put token in this key after user made login
          // userToken = data.token 
          localStorage.setItem("userToken",data.token);
          // call getUserData method from auth Service , this method to decode token
          this._authService.getUserData();

          // ^ lmma y click 3la button w login tm yro7 direct 3la al login
          this._router.navigate(['/home']);
        },
        error: (err:any) => {  // when validation true but email is exists or password and rePassword not match
          
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
}
