import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder,Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardModule,InputTextModule,ReactiveFormsModule,ButtonModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  staticUserName:string = "admin"; //static username
  staticPasswod:string = "123";   //static password
  loginFailed: boolean = false; // flag to track login failure
loginForm = this.fb.group({
  username:['',Validators.required],
  password:['',Validators.required]
}) 
constructor(
  private fb:FormBuilder,
  private router:Router,
){}

get username(){
  return this.loginForm.controls['username'];
}
get password(){
  return this.loginForm.controls['password'];
}
login(){
  const {username, password} = this.loginForm.value;
  if(username === this.staticUserName && password === this.staticPasswod){
    this.router.navigate(['/search']);
  }else{
    this.loginFailed = true;
  } 
}
onInputChange(){
  this.loginFailed = false;
}

}