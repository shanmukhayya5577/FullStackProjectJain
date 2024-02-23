import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from 'src/app/service/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm!:FormGroup;
  submitted!:false;

  constructor(private fb:FormBuilder,private route:Router,
    private service:AuthserviceService,
    private toast:ToastrService) { }

  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      email:this.fb.control('',[Validators.required]),
      password:this.fb.control('',[Validators.required])
    })
  }

  get email() {
    return this.LoginForm.get('email')
  }

  get password() {
    return this.LoginForm.get('password')
  }

  LoginSubmit(){
    const reqbody = {
      email:this.LoginForm.get('email')?.value,
      password:this.LoginForm.get('password')?.value
    }
    if(this.LoginForm.valid){
      this.service.getLoginApi(reqbody).subscribe((res:any)=>{
        console.log(res);
        if(res['message'] === 'Login successfylly'){
          this.toast.success('Login in sucess');
          this.route.navigate(['dashboard']);
        } else {
          this.toast.error(res['message']);
        }
      },err=>{
        this.toast.error(err['error']['message']);
      }
      )
    }else{
      this.toast.error('Please Fill the data');
      this.LoginForm.markAllAsTouched();
    }
  }

  register(){
    this.route.navigate(['register'])
  }

}
