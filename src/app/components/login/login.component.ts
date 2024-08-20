import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder,Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardModule,InputTextModule,ReactiveFormsModule,ButtonModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
loginForm = this.fb.group({
  email:['',[Validators.required,Validators.email]],
  password:['',Validators.required]
}) 
constructor(
  private fb:FormBuilder,
  private authService:AuthService,
  private router:Router,
  // private msgService:MessageService
){}

get email(){
  return this.loginForm.controls['email'];
}
get password(){
  return this.loginForm.controls['password'];
}
loginUser() {
  const {email, password} = this.loginForm.value;
  
  this.authService.getUserByEmail(email as string).subscribe(
    response => {
      // Assuming response is an array of users
      const user = response.find(u => u.password === password);
      
      if (user) {
        sessionStorage.setItem('email', email as string);
        this.router.navigate(['/search']);
      } else {
        console.log("Invalid credentials");
      }
    },
    error => {
      console.log("Error fetching user:", error);
    }
  );
}



}



// MY IMPLEMENTATION
// loginUser(){
//   const {email,password} = this.loginForm.value;
//   // console.log(email,password);
//   this.authService.getUserByEmail(email as string).subscribe(
//     response =>{
//       console.log(response);
//       if(response.length > 0 && response[0].password === password){
//         sessionStorage.setItem('email',email as string)
//         this.router.navigate(['/home']);
//       }
//     },
//     error =>{
//       // this.msgService.add({severity:'error ',summary:'Error',detail:'something went wrong ya sa7by'})
//       console.error(error);
//     }
//   )
// }